import React, { useCallback, useContext, useState } from "react";
import cs from "classnames";
import DatastoreContext from "../contexts/DatastoreContext.jsx";
import Todo from "./Todo.jsx";
import useKeyboardEvents from "../hooks/useKeyboardEvents.jsx";

const CREATING = "CREATING";

const UPDATING = "UPDATING";

const TodoList = () => {
  const { todos, store, update, remove, updatePriority } =
    useContext(DatastoreContext);
  const [status, setStatus] = useState(CREATING);
  const [text, setText] = useState("");
  const [todo, setTodo] = useState(null);

  const resetStatus = useCallback(() => {
    setText("");
    setTodo(null);
    setStatus(CREATING);
  }, []);

  const onPressConfirm = useCallback(async () => {
    if (text) {
      if (status === CREATING)
        await store({
          todoId: 10,
          text,
          status: 0,
          priority:
            todos.length > 0 ? todos[todos.length - 1].priority + 1000 : 1000,
        });
      else
        await update(todo.todoId, {
          ...todo,
          text,
        });
    }
    resetStatus();
  }, [resetStatus, text, status, store, todos, update, todo]);

  const onEdit = useCallback((todo) => {
    setText(todo.text);
    setTodo(todo);
    setStatus(UPDATING);
  }, []);

  const wrappedUpdate = useCallback(
    (fn) => {
      return async (...args) => {
        resetStatus();
        await fn(...args);
      };
    },
    [resetStatus]
  );

  const _toggleComplete = useCallback(
    (todo) => {
      return update(todo.todoId, { ...todo, status: !todo.status });
    },
    [update]
  );

  const _deleteTodo = useCallback((todoId) => remove(todoId), [remove]);

  // 1 means prio up, -1 means prio down
  const _updatePriority = useCallback(
    async (todo, direction = 1) => {
      return updatePriority(todo.todoId, todo, direction);
    },
    [updatePriority]
  );

  const toggleComplete = wrappedUpdate(_toggleComplete);
  const deleteTodo = wrappedUpdate(_deleteTodo);
  const updatePriorityWrapped = wrappedUpdate(_updatePriority);

  useKeyboardEvents(
    todo,
    updatePriorityWrapped,
    onPressConfirm,
    deleteTodo,
    toggleComplete
  );

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
          todos.map((t) => {
            return (
              <Todo
                key={t.todoId}
                selected={todo && todo.todoId === t.todoId}
                todo={t}
                onEdit={onEdit}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TodoList;
