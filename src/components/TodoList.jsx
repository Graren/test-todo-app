import React, { useCallback, useContext, useMemo, useState } from "react";
import cs from "classnames";
import DatastoreContext from "../contexts/DatastoreContext.jsx";
import Todo from "./Todo.jsx";
import useKeyboardEvents from "../hooks/useKeyboardEvents.jsx";

const CREATING = "CREATING";

const UPDATING = "UPDATING";

const TodoList = () => {
  const { todos, store, update, remove } = useContext(DatastoreContext);
  const [status, setStatus] = useState(CREATING);
  const [text, setText] = useState("");
  const [todo, setTodo] = useState(null);

  const sortedTodos = useMemo(() => {
    return todos.sort((a, b) => a.priority - b.priority);
  });

  // 1 means prio up, -1 means prio down
  const updatePriority = useCallback(
    (todo, direction = 1) => {
      const index = sortedTodos.map((t) => t.todoId).indexOf(todo.todoId);

      const replacementElement = todos[index + direction];

      // don't move beyond array bounds
      if (!replacementElement) return;
      else
        update(todo.todoId, {
          ...todo,
          priority: replacementElement.priority - direction,
        });
    },
    [update]
  );

  const onPressConfirm = useCallback(async () => {
    setText("");
    setTodo(null);
    setStatus(CREATING);
    if (text) {
      if (status === CREATING)
        await store({
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
  }, [text, status, todo, store, update]);

  const onEdit = useCallback((todo) => {
    setText(todo.text);
    setTodo(todo);
    setStatus(UPDATING);
  }, []);

  const toggleComplete = useCallback((todo) => {
    return update(todo.todoId, { ...todo, status: !todo.status });
  }, []);

  const deleteTodo = useCallback((todoId) => remove(todoId), []);

  useKeyboardEvents(
    todo,
    updatePriority,
    onPressConfirm.deleteTodo,
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
          sortedTodos.map((t) => {
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
