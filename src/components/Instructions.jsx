import React, { Fragment } from "react";

const Instructions = ({ todo }) => {
  return (
    <div className={"instructions-container"}>
      <p className={"instructions-row"}>
        Click on a Todo to select them or create new todos by writting on the
        input field and pressing confirm. Selecting a todo allows you to update
        them and use keyboard shortcuts
      </p>

      {todo && (
        <Fragment>
          <p className={"instructions-row"}>
            CTRL / Command key + D: Delete TODO
          </p>
          <p className={"instructions-row"}>
            CTRL / Command key + T: Toggle Completion
          </p>
          <p className={"instructions-row"}>
            CTRL / Command key + S: Confirm changes to a TODO (only when
            updating)
          </p>
          <p className={"instructions-row"}>
            CTRL / Command key + Arrow up / Arrow Down: Change priority up /
            down
          </p>
        </Fragment>
      )}
    </div>
  );
};

export default Instructions;
