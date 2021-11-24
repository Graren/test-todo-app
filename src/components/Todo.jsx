import React from "react";
import cs from "classnames";

const Todo = ({ todo, selected, onEdit }) => {
  return (
    <div
      className={cs("todo", "clickable", {
        complete: !!todo.status,
        selected: selected && !todo.status,
        "complete-selected": selected && todo.status,
      })}
      onClick={() => onEdit(todo)}
    >
      <span>{todo.text}</span>
    </div>
  );
};

export default Todo;
