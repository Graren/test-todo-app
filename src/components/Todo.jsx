import React, { useContext } from "react";
import cs from "classnames";
import DatastoreContext from "../contexts/DatastoreContext.jsx";

const Todo = ({ todo, onEdit }) => {
  const { remove, update } = useContext(DatastoreContext);
  return (
    <div
      className={cs("todo", {
        complete: !!todo.status,
      })}
    >
      <span>{todo.text}</span>
      <button type="button" onClick={() => onEdit(todo)}>
        Edit
      </button>
      <button type="button" onClick={() => remove(todo.todoId)}>
        Delete
      </button>
      <button
        type="button"
        onClick={() => update(todo.todoId, { ...todo, status: !todo.status })}
      >
        Toggle complete
      </button>
    </div>
  );
};

export default Todo;
