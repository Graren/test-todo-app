const { ipcMain } = require("electron");
const sqlite3 = require("sqlite3");

const database = new sqlite3.Database("./todo.db", (err) => {
  if (err) console.error("Database opening error: ", err);
});

// DUe to time constraints I won't be focusing on making this safe
const SELECT_STATEMENT = "SELECT * FROM TODO";

ipcMain.on("get-todos", (event) => {
  database.all(SELECT_STATEMENT, (err, rows) => {
    event.reply("get-todos-response", (err && err.message) || rows);
  });
});
