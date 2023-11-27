import { Account } from '../types/accounts';

export class AccountService {
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