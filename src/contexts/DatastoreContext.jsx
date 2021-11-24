import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useDatasource from "../hooks/useDatasource.jsx";
import LoadingContext from "./LoadingContext.jsx";

const initialState = {
  todos: [],
  store: () => null,
  update: () => null,
  remove: () => null,
  updatePriority: () => null,
};

const DatastoreContext = createContext(initialState);

export const DatastoreProvider = ({ children }) => {
  const [todos, setTodos] = useState(initialState.todos);
  const [shouldLoad, setShouldLoad] = useState(true);
  const { showLoading, hideLoading } = useContext(LoadingContext);

  const datasource = useDatasource();

  const store = useCallback(
    async (todo) => {
      await datasource.store(todo);
      setShouldLoad(true);
    },
    [datasource]
  );

  const update = useCallback(
    async (id, todo) => {
      await datasource.update(todo);
      setShouldLoad(true);
    },
    [datasource]
  );

  const sortedTodos = useMemo(() => {
    return todos.sort((a, b) => a.priority - b.priority);
  }, [todos]);

  const updatePriority = useCallback(
    async (id, todo, direction) => {
      const index = sortedTodos.map((t) => t.todoId).indexOf(todo.todoId);

      const replacementElement = sortedTodos[index - direction];

      // don't move beyond array bounds
      if (!replacementElement) return;
      await datasource.update({
        ...todo,
        priority: replacementElement.priority - direction,
      });
      setShouldLoad(true);
    },
    [datasource, sortedTodos]
  );

  const remove = useCallback(
    async (id) => {
      await datasource.remove(id);
      setShouldLoad(true);
    },
    [datasource]
  );

  useEffect(() => {
    const get = async () => {
      setShouldLoad(false);
      try {
        showLoading();
        const todos = await datasource.load();
        setTodos(todos);
      } catch (err) {
        // do nothing
      } finally {
        hideLoading();
      }
    };

    if (datasource && shouldLoad) get();
  }, [datasource, hideLoading, shouldLoad, showLoading]);

  return (
    <DatastoreContext.Provider
      value={{ todos: sortedTodos, updatePriority, store, update, remove }}
    >
      {children}
    </DatastoreContext.Provider>
  );
};

export default DatastoreContext;
