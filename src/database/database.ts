import { DataSource } from "typeorm";
import { join, resolve } from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: resolve(__dirname, "..", "..", ".env") });

const database = new DataSource({
  type: "mysql",
  entities: [join(__dirname, "..", "**/*.schema.{js,ts}")],
  host: String(process.env.DB_HOST),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  ssl: { rejectUnauthorized: false },
});

export default database;
