import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entities/Users"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "aswassaw",
    database: "paslon",
    synchronize: true,
    logging: false,
    entities: [Users],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
