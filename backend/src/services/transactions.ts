import TransactionModel  from '../database/transactions.model';
import { Transaction } from '../types/transactions';
import { Account } from '../types/accounts';
import AccountService  from './accounts';
import { HttpStatusCodes } from '../types/httpStatus';
import Database from "../database/connection";

export default class TransactionService {
  
/**
 * Create a new transaction in the system.
 *
 * @param {Transaction} createTransactionData - The transaction data for creating a new transaction.
 * @return {Promise<number>} - The updated account balance after the transaction is created.
 */
  static async createTransaction(createTransactionData: Transaction): Promise<Account> {
    try{
      const account = await AccountService.getAccountByNumber(createTransactionData.accountNumber);
      if(account && account.id) {
        let accountData = await AccountService.updateCurrentBalance(createTransactionData, account);

        let databaseConnection = await Database.createNewDatabaseConnection();
        await TransactionModel.create({...createTransactionData, accountId: account.id});
        await databaseConnection.close();

        return accountData;
      }
      else throw HttpStatusCodes.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }
}