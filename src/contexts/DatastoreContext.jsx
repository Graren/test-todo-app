import React, { createContext, useState } from "react";
import useDatasource from "../hooks/useDatasource.jsx";

const dummyData = [
  {
    todoId: 1,
    text: "Text A",
    priority: 1,
    status: false,
  },
  {
    todoId: 2,
    text: "Text B",
    priority: 2,
    status: false,
  },
  {
    todoId: 3,
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

  const datasource = useDatasource();

  const store = (todo) => {
    setTodos((todos) => [...todos, todo]);
  };

  const update = (id, todo) => {
    setTodos((todos) =>
      todos.map((t) => {
        if (t.todoId === id) return todo;
        return t;
      })
    );
  };

  const remove = (id) => {
    setTodos((todos) =>
      todos.filter((t) => {
        return t.todoId !== id;
      })
    );
  };

  console.log(datasource.id)

  return (
    <DatastoreContext.Provider value={{ todos, store, update, remove }}>
      {children}
    </DatastoreContext.Provider>
  );
};

export default DatastoreContext;
