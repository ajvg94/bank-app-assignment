import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import AccountModel from './accounts.model'
import TransactionModel from './transactions.model'

const databaseConnection = new Sequelize({
    dialect: "sqlite",
    storage: './database.sqlite3',
    models: [AccountModel, TransactionModel]
});

export default databaseConnection;