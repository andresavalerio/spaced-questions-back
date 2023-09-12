import database from "./database";

describe("database", () => {
  it("should connect", async () => {
    const initializedDatabase = await database.initialize();

    await initializedDatabase.destroy();
  });
});
