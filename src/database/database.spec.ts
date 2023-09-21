import database from "./database";

describe("database", () => {
  it("should connect to database", async () => {
    try {
      const initializedDatabase = await database.initialize();

      await initializedDatabase.destroy();
    } catch (error) {
      throw error;
    }
  });
});
