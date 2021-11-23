import React, { useContext, useState } from "react";
import cs from "classnames";
import DatastoreContext from "../contexts/DatastoreContext.jsx";
import Todo from "./Todo.jsx";

const CREATING = "CREATING";

const UPDATING = "UPDATING";

const TodoList = () => {
  const { todos, store, update } = useContext(DatastoreContext);
  const [status, setStatus] = useState(CREATING);
  const [text, setText] = useState("");
  const [todo, setTodo] = useState(null);

  const onPressConfirm = () => {
    if(status === CREATING) store({
        text,
        status: 0,
        priority: todos.length + 1
    })
    else update(todo.todoId, {
        ...todo,
        text
    })

    setText("");
    setTodo(null)
    setStatus(CREATING);
  };

  const onEdit = (todo) => {
    setTodo(todo);
    setText(todo.text);
    setStatus(UPDATING);
  };

  return (
    <div className={cs("todo-list")}>
      <div className={cs("todo-input")}>
        <input
          type="text"
          value={text}
          onChange={({ target: { value } }) => setText(value)}
        />
        <button type="button" onClick={() => onPressConfirm()}>
          Confirm
        </button>
      </div>
      <div className={cs("todo-list")}>
        {todos &&
          todos.map((todo) => {
            return <Todo key={todo.todoId} todo={todo} onEdit={onEdit} />;
          })}
      </div>
    </div>
  );
};

export default TodoList;
