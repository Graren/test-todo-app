import { useEffect, useState } from "react";

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ code }) => {
    if (code === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ code }) => {
    if (code === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
};

export default useKeyPress