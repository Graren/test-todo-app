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

const dummyData = [
  {
    todoId: 1,
    text: "Text A",
    priority: 1000,
    status: false,
  },
  {
    todoId: 2,
    text: "Text B",
    priority: 2000,
    status: false,
  },
  {
    todoId: 3,
    text: "Text C",
    priority: 3000,
    status: true,
  },
];

const initialState = {
  todos: dummyData,
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

  const store = useCallback(async (todo) => {
    // datasource.store
    setTodos((todos) => [...todos, todo]);
  }, []);

  const update = useCallback((id, todo) => {
    // datasource.update
    setTodos((todos) =>
      todos.map((t) => {
        if (t.todoId === id) return todo;
        return t;
      })
    );
  }, []);

  const updatePriority = useCallback((id, todo, direction) => {
    setTodos((todos) => {
      const sorted = todos.sort((a, b) => a.priority - b.priority);
      const index = sorted.map((t) => t.todoId).indexOf(todo.todoId);

      const replacementElement = todos[index - direction];

      // don't move beyond array bounds
      if (!replacementElement) return todos;
      return todos.map((t) => {
        if (t.todoId === id)
          return {
            ...todo,
            priority: replacementElement.priority - direction,
          };
        return t;
      });
    });
  }, []);

  const remove = useCallback((id) => {
    // datasource.remove
    setTodos((todos) =>
      todos.filter((t) => {
        return t.todoId !== id;
      })
    );
  }, []);

  // Add an use effect that does datasource.load

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

    // if (datasource && shouldLoad) get();
  }, [datasource, hideLoading, shouldLoad, showLoading]);

  const sortedTodos = useMemo(() => {
    return todos.sort((a, b) => a.priority - b.priority);
  }, [todos]);

  return (
    <DatastoreContext.Provider
      value={{ todos: sortedTodos, updatePriority, store, update, remove }}
    >
      {children}
    </DatastoreContext.Provider>
  );
};

export default DatastoreContext;
