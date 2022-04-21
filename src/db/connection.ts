import { Sequelize } from "sequelize-typescript";

import { Dog } from "./models/Dog";

const connection = new Sequelize({
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    logging: false,
    models: [Dog],
});

export default connection;