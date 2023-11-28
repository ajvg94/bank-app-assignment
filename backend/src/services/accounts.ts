import { Account } from '../types/accounts';
import { ErrorTypes } from '../types/error';
import { Transaction, transactionTypes } from '../types/transactions';
import AccountModel  from '../database/accounts.model';
import Database from "../database/connection";

export default class AccountService {
  
  /**
   * Retrieves an account by its account number.
   *
   * @param {number} accountNumber - The account number to search for.
   * @return {Promise<Account>} - A promise that resolves to the account with the given account number.
   */
  static async getAccountByNumber(accountNumber: number): Promise<Account>{
    try{
      let databaseConnection = await Database.createNewDatabaseConnection();
      const account = await AccountModel.findOne({ where: {accountNumber: accountNumber} });
      await databaseConnection.close();

      return account?.dataValues as Account;
    }catch(error){
      throw(error);
    }
  }

  /**
   * Creates an account using the provided account data.
   *
   * @param {Account} createAccountData - The account data used to create the account.
   * @return {Promise<number | undefined>} The ID of the newly created account.
   */
  static async createAccount(createAccountData: Account): Promise<number | undefined> {
    try{
      let databaseConnection = await Database.createNewDatabaseConnection();
      const createdAccount: Account = await AccountModel.create({...createAccountData});
      await databaseConnection.close();

      return createdAccount.id;
    }catch(error){
      throw(error);
    }
  }

  /**
   * Updates the current balance of an account based on a transaction, and returns the updated account data.
   *
   * @param {Transaction} transactionData - The transaction data.
   * @param {Account} account - The account object.
   * @return {Promise<Account>} The updated account data.
   */
  static async updateCurrentBalance(transactionData: Transaction, accountData: Account): Promise<Account> {
    try{
      if(transactionData.type === transactionTypes.WITHDRAWAL) accountData.currentBalance = accountData.currentBalance - transactionData.amount;
      else accountData.currentBalance = accountData.currentBalance + transactionData.amount;

      if (accountData.currentBalance < 0) throw ErrorTypes.INSUFFICIENT_FUNDS;

      let databaseConnection = await Database.createNewDatabaseConnection();
      await AccountModel.update(accountData, { where: {accountNumber: accountData.accountNumber} });
      await databaseConnection.close();
      return accountData;
    }catch (error){
      throw error;
    }
  }
}