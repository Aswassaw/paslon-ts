import "reflect-metadata";
import { DataSource } from "typeorm";
import { Paslon } from "./entities/Paslon";
import { Vote } from "./entities/Vote";
import { Party } from "./entities/Party";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "aswassaw",
  database: "paslon",
  synchronize: true,
  logging: false,
  entities: [Paslon, Vote, Party, User],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
