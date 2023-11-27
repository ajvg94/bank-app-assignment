import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import Account from './accounts.model'
import Transaction from './transactions.model'

const databaseConnection = new Sequelize({
    dialect: "sqlite",
    storage: './database.sqlite3',
    models: [Account, Transaction]
});

export default databaseConnection;