import React from "react";
import cs from "classnames";
import "../app.css";

// Global overlay component to display a loading component
// TODO: replace text with a Spinner component

const LoadingWrapper = ({ loading }) => {
  return loading ? (
    <div className={cs("loading-background")}>
      <p>loading...</p>
    </div>
  ) : null;
};

export default LoadingWrapper;
