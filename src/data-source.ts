import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entities/Users"
import { Votes } from "./entities/Votes"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "aswassaw",
    database: "paslon",
    synchronize: true,
    logging: false,
    entities: [Users, Votes],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
