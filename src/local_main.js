const { ipcMain } = require("electron");
const sqlite3 = require("sqlite3");

const database = new sqlite3.Database("./todo.db", (err) => {
  if (err) console.error("Database opening error: ", err);
});

// DUe to time constraints I won't be focusing on making this safe
const SELECT_STATEMENT = "SELECT * FROM TODO";

const CREATE_STATEMENT =
  "INSERT INTO TODO (text, priority, status) VALUES(?, ? , ?)";

const UPDATE_STATEMENT =
  "UPDATE TODO SET text = ?text, priority = ?priority, status = ?status WHERE todoId = ?todoId";

const DELETE_STATEMENT = "DELETE  FROM TODO WHERE todoId = ?";

ipcMain.on("get-todos", (event) => {
  database.all(SELECT_STATEMENT, (err, rows) => {
    event.reply("get-todos-response", (err && "ERROR") || rows);
  });
});

ipcMain.on("create-todo", (event, arg) => {
  const todo = JSON.parse(arg);
  const stmt = database.prepare(CREATE_STATEMENT);
  stmt.run([todo.text, todo.priority, todo.status], (err) => {
    event.reply("create-todo-response", (err && "ERROR") || arg);
  });
});

ipcMain.on("update-todo", (event, arg) => {
  const todo = JSON.parse(arg);
  const stmt = database.prepare(UPDATE_STATEMENT);
  stmt.run(todo, (err) => {
    event.reply("update-todo-response", (err && "ERROR") || arg);
  });
});

ipcMain.on("delete-todo", (event, arg) => {
  const stmt = database.prepare(DELETE_STATEMENT);
  stmt.run(arg, (err) => {
    event.reply("remove-todo-response", (err && "ERROR") || arg);
  });
});
