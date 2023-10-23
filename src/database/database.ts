import { DataSource } from "typeorm";
import { join } from "node:path";

const database = new DataSource({
  type: "sqlite",
  entities: [join(__dirname, "..", "**/*.schema.{js,ts}")],
  database: "./database.sqlite",
});

export default database;
