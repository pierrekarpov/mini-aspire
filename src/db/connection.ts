import { Sequelize } from "sequelize-typescript";
const env = process.env.NODE_ENV || 'development'
const config = require(`./config.js`)[env];
import { UserType } from "./models/UserType";
import { User } from "./models/User";
import { Loan } from "./models/Loan";
import { Invoice } from "./models/Invoice";

const connection = new Sequelize({
    dialect: config.dialect,
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
    logging: false,
    models: [UserType, User, Loan, Invoice],
});

export default connection;