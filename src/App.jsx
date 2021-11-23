import React from "react";
import "./app.css";
import { DatastoreProvider } from "./contexts/DatastoreContext.jsx";
import { LoadingProvider } from "./contexts/LoadingContext.jsx";
import TodoList from "./components/TodoList.jsx";

const App = () => {
  return (
    <div className="App">
      <LoadingProvider>
        <DatastoreProvider>
          <header className="App-header">
            <h1>Test for Opreto Corp</h1>
          </header>
          <TodoList />
        </DatastoreProvider>
      </LoadingProvider>
    </div>
  );
};

export default App;
