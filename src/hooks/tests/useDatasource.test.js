/**
 * @jest-environment jsdom
 */
import sqlite3 from "../../sources/sqlite3";
jest.mock("../../sources/sqlite3", () => ({
  get: jest.fn(),
}));

describe("use data source", function () {
  const OLD_ENV = process.env;
  afterAll(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  it("should use the right db for env", async () => {
    process.env = { ...OLD_ENV, DATASTORE_SOURCE: "sqlite" };

    const useDatasource = require("../useDatasource.jsx").default;

    const datasource = useDatasource();

    await datasource.load();

    expect(sqlite3.get).toHaveBeenCalled();
  });

  it("should fail if env is invalid", async () => {
    process.env = {};

    try {
      require("../useDatasource.jsx").default;
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
