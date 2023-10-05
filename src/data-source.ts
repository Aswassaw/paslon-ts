import "reflect-metadata";
import { DataSource } from "typeorm";
import { Paslon } from "./entities/Paslon";
import { Vote } from "./entities/Vote";
import { Party } from "./entities/Party";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "aswassaw",
  database: "paslon",
  synchronize: true,
  logging: false,
  entities: [Paslon, Vote, Party],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
