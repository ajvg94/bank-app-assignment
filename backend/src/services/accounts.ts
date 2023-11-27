import { Account } from '../types/accounts';

export class AccountService {
  /**
   * Retrieves an account by its ID.
   *
   * @param {accountId} number
   * @return {Promise<Account>} The retrieved account.
   */
  static async getAccountById(accountId: number) {
    try{
      const account = {
        "name": "cuenta 1",
        "number": 123,
        "initialBalance": 12345,
        "currentBalance": 123456
      }
      return account;
    }catch (error){
      throw error;
    }
  }

  /**
   * Creates an account using the provided account data.
   *
   * @param {Account} createAccountData - The account data used to create the account.
   * @return {Promise<void>} A promise that resolves when the account is created successfully.
   */
  static async createAccount(createAccountData: Account) {
    try{
      return 12345
    }catch (error){
      throw error;
    }
  }
}