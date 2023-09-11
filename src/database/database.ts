import { DataSource } from "typeorm";

const database = new DataSource({
  type: "sqlite",
  entities: ["**/*.model.ts"],
  database: "./database.sqlite",
  synchronize: true,
});

export default database;
