import db from "../src/database/database";

export const restartDatabase = async () => {
  await db.synchronize(true);
};

export const database = db;
