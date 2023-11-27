import { Account, UpdateCurrentBalanceData } from '../types/accounts';
import { Transaction, transactionTypes } from '../types/transactions';
import AccountModel  from '../database/accounts.model';

export class AccountService {
  
  /**
   * Retrieves an account by its account number.
   *
   * @param {number} accountNumber - The account number to search for.
   * @return {Promise<Account>} - A promise that resolves to the account with the given account number.
   */
  static async getAccountByNumber(accountNumber: number): Promise<Account>{
    try{
      const account = await AccountModel.findOne({ where: {accountNumber: accountNumber} }) as Account;
      return account;
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
      const createdAccount: Account = await AccountModel.create({...createAccountData});
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
  static async updateCurrentBalance(transactionData: Transaction, account: Account): Promise<Account> {
    try{
      if(transactionData.type === transactionTypes.WITHDRAWAL) account.currentBalance = account.currentBalance - transactionData.amount;
      else account.currentBalance = account.currentBalance + transactionData.amount;

      await AccountModel.update(account, { where: {accountNumber: account.accountNumber} });
      
      let accountData = await AccountService.getAccountByNumber(transactionData.accountNumber);
      return accountData;
    }catch (error){
      throw error;
    }
  }
}