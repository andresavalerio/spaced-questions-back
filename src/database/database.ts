import { DataSource } from "typeorm";

const database = new DataSource({
  type: "sqlite",
  entities: ["**/*.model.ts"],
  database: "./database.sqlite",
});

database
  .initialize()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error("database connection error", err);
  });

export default database;
