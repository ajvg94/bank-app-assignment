import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import AccountModel from './accounts.model'
import TransactionModel from './transactions.model'

export default class Database{
    static async createNewDatabaseConnection (){
        const databaseConnection = new Sequelize({
            dialect: "sqlite",
            storage: './database.sqlite3',
            logging: false,
            models: [AccountModel, TransactionModel]
        });
        await databaseConnection.sync();
        return databaseConnection;
    }
}