const { ipcRenderer } = require("electron");

const get = () => {
  return new Promise((resolve, reject) => {
    ipcRenderer.once("get-todos-response", (_, arg) => {
      if (arg === "ERROR") reject("Could not obtain TODOs");
      else resolve(arg);
    });
    ipcRenderer.send("get-todos");
  });
};

const create = (payload) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.once("create-todo-response", (_, arg) => {
      if (arg === "ERROR") reject("Could not create TODO");
      else resolve(arg);
    });
    ipcRenderer.send("create-todo", JSON.stringify(payload));
  });
};

const update = (payload) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.once("update-todo-response", (_, arg) => {
      if (arg === "ERROR") reject("Could not update TODO");
      else resolve(arg);
    });
    ipcRenderer.send("update-todo", JSON.stringify(payload));
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.once("remove-todo-response", (_, arg) => {
      if (arg === "ERROR") reject("Could not delete TODO");
      else resolve(arg);
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
