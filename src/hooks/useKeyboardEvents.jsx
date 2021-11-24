import { useEffect } from "react";
import useKeyPress from "./useKeyPress";

// Seems command keys are mapped in a non standard way https://stackoverflow.com/questions/3902635/how-does-one-capture-a-macs-command-key-via-javascript

const commandCode = process.platform === "darwin" ? "OSLeft" : "ControlLeft"; // command for mac and control for the rest

const useKeyboardEvents = (todo, updatePriority, save, remove, toggle) => {
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const dPressed = useKeyPress("KeyD");
  const sPressed = useKeyPress("KeyS");
  const tPressed = useKeyPress("KeyT");
  const commandPressed = useKeyPress(commandCode);

  useEffect(() => {
    if (todo && commandPressed && dPressed) {
      remove(todo.todoId);
    }
  }, [commandPressed, dPressed, remove, todo]);

  useEffect(() => {
    if (todo && commandPressed) {
      if (arrowUpPressed) {
        updatePriority(todo, 1);
      } else if (arrowDownPressed) {
        updatePriority(todo, -1);
      }
    }
  }, [arrowDownPressed, arrowUpPressed, commandPressed, todo, updatePriority]);

  // Only works for updating not creating, relying on todo structure for memoization, without it it's a bit more brittle
  useEffect(() => {
    if (todo && commandPressed && sPressed) {
      save();
    }
  }, [commandPressed, sPressed, save, todo]);

  useEffect(() => {
    if (todo && commandPressed && tPressed) {
      toggle(todo);
    }
  }, [commandPressed, tPressed, todo, toggle]);

  return {
    commandPressed,
    dPressed,
    tPressed,
    sPressed,
    arrowDownPressed,
    arrowUpPressed,
  };
};

export default useKeyboardEvents;
