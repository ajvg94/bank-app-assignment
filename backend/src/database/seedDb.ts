import AccountModel from './accounts.model'
import TransactionModel from './transactions.model'
import { transactionTypes } from '../types/transactions';
import Database from './connection';
seed();
async function seed() {
    // create tables
    console.log("creating tables")
    let databaseConnection = await Database.createNewDatabaseConnection();
    await databaseConnection.sync({force: true});
    console.log("created tables")

    //insert data
    await Promise.all([
        AccountModel.create({
            id: 1,
            accountNumber: 1234,
            name: 'msanchezc',
            currentBalance: 800,
            initialBalance: 600
        }),
        AccountModel.create({
            id: 2,
            accountNumber: 12345,
            name: 'clagosx',
            currentBalance: 200,
            initialBalance: 500
        }),
        TransactionModel.create({
            id: 1,
            accountId: 1,
            type: transactionTypes.DEPOSIT,
            amount: 200
        }),
        TransactionModel.create({
            id: 2,
            accountId: 2,
            type: transactionTypes.WITHDRAWAL,
            amount: 300
        }),
    ]);

    await databaseConnection.close();
}
