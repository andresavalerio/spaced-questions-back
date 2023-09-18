import database from "database/database";

export const restartDatabase = async () => {
  const initializedDatabase = await database.initialize();

  await initializedDatabase.dropDatabase();

  await initializedDatabase.synchronize(true);
};
