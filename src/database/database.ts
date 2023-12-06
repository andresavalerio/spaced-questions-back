import { DataSource } from "typeorm";
import { join, resolve } from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: resolve(__dirname, "..", "..", ".env") });

const database = new DataSource({
  type: "sqlite",
  entities: [join(__dirname, "..", "**/*.schema.{js,ts}")],
  database: String(process.env.DB_DATABASE),
});

export default database;
