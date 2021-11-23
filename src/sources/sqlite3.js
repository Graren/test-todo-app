const { ipcRenderer } = require("electron");

const get = () => {
  return new Promise((resolve) => {
    ipcRenderer.once("get-todos-response", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("get-todos");
  });
};

const create = (payload) => {
  return new Promise((resolve) => {
    ipcRenderer.once("create-todo-response", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("create-todo", JSON.stringify(payload));
  });
};

const update = (payload) => {
  return new Promise((resolve) => {
    ipcRenderer.once("update-todo-response", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("update-todo", JSON.stringify(payload));
  });
};

const remove = (id) => {
  return new Promise((resolve) => {
    ipcRenderer.once("remove-todo-response", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("remove-todo", id);
  });
};

export default {
  id: "SQLITE3",
  get,
  create,
  update,
  remove,
};
