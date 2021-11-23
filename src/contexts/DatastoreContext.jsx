import React, { createContext, useCallback, useState } from "react";
import useDatasource from "../hooks/useDatasource.jsx";

const dummyData = [
  {
    todoId: 1000,
    text: "Text A",
    priority: 1,
    status: false,
  },
  {
    todoId: 2000,
    text: "Text B",
    priority: 2,
    status: false,
  },
  {
    todoId: 3000,
    text: "Text C",
    priority: 3,
    status: true,
  },
];

const initialState = {
  todos: dummyData,
  store: () => null,
  update: () => null,
  remove: () => null,
};

const DatastoreContext = createContext(initialState);

export const DatastoreProvider = ({ children }) => {
  const [todos, setTodos] = useState(initialState.todos);

  // TODO: replace local dummy implementation with real datasource use
  const datasource = useDatasource();

  const store = useCallback(async (todo) => {
    // datasource.store
    setTodos((todos) => [...todos, todo]);
  });

  const update = useCallback((id, todo) => {
    // datasource.update
    setTodos((todos) =>
      todos.map((t) => {
        if (t.todoId === id) return todo;
        return t;
      })
    );
  });

  const remove = useCallback((id) => {
    // datasource.remove
    setTodos((todos) =>
      todos.filter((t) => {
        return t.todoId !== id;
      })
    );
  });

  // Add an use effect that does datasource.load

  return (
    <DatastoreContext.Provider value={{ todos, store, update, remove }}>
      {children}
    </DatastoreContext.Provider>
  );
};

export default DatastoreContext;
