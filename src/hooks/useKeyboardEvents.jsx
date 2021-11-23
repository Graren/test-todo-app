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
      // prevent multiple execution
    if (commandPressed) {
      if (arrowUpPressed) {
        updatePriority(todo, 1);
      }

      if (arrowDownPressed) {
        updatePriority(todo, -1);
      }

      if (dPressed) {
        remove(todo.todoId);
      }

      if (sPressed) {
        save();
      }

      if (tPressed) {
        toggle(todo);
      }
    }
  }, [
    commandPressed,
    dPressed,
    arrowUpPressed,
    arrowDownPressed,
    sPressed,
    tPressed,
    updatePriority,
    remove,
    save,
    toggle,
    todo,
  ]);

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
