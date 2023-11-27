import Account from './accounts.model'
import Transaction from './transactions.model'
import { transactionTypes } from '../types/transactions';
import databaseConnection from './connection';
seed();
async function seed() {
    // create tables
    console.log("creating tables")
    await databaseConnection.sync({force: true});
    console.log("created tables")

    //insert data
    await Promise.all([
        Account.create({
            id: 1,
            name: 'msanchezc',
            currentBalance: 800,
            initialBalance: 600
        }),
        Account.create({
            id: 2,
            name: 'clagosx',
            currentBalance: 200,
            initialBalance: 500
        }),
        Transaction.create({
            id: 1,
            accountId: 1,
            type: transactionTypes.DEPOSIT,
            amount: 200
        }),
        Transaction.create({
            id: 2,
            accountId: 2,
            type: transactionTypes.WITHDRAWAL,
            amount: 300
        }),
    ]);
}
