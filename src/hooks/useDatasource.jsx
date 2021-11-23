import sqlite3 from "../sources/sqlite3";

let instance = null;

(() => {
  switch (process.env.DATASTORE_SOURCE) {
    case "sqlite":
      instance = sqlite3;
      break;
    default:
      throw new Error("No valid datasource found, contact support");
  }
})();

// Hook that determines the right source from env vars and exposes it to the datastore context
// Can easily add more abstraction than this, but time constraints
const useDatasource = () => {
  const load = () => {
    return instance.get();
  };

  const store = (payload) => {
    return instance.create(payload);
  };

  const update = (payload) => {
    return instance.update(payload);
  };

  const remove = (id) => {
    return instance.remove(id);
  };

  return {
    load,
    store,
    update,
    remove,
  };
};

export default useDatasource;
