import React from "react";
import cs from "classnames";

const Todo = ({ todo, selected, onEdit, toggleComplete, deleteTodo }) => {
  return (
    <div
      className={cs("todo", {
        complete: !!todo.status,
        selected: selected,
      })}
    >
      <span>{todo.text}</span>
      <button type="button" onClick={() => onEdit(todo)}>
        Edit
      </button>
      <button type="button" onClick={() => deleteTodo(todo)}>
        Delete
      </button>
      <button type="button" onClick={() => toggleComplete(todo)}>
        Toggle complete
      </button>
    </div>
  );
};

export default Todo;
