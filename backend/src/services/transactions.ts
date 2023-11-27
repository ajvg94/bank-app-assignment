import { Transaction } from '../types/transactions';
import { Account } from '../types/accounts';
import { HttpStatusCodes } from '../types/error';

export class TransactionService {
  /**
   * Creates a new transaction for a user.
   *
   * @param {number} UserId - The ID of the user.
   * @param {Transaction} createTransactionData - The data for creating the transaction.
   * @return {Promise<void>} - A promise that resolves when the transaction is created.
   */
  static async createTransaction(createTransactionData: Transaction) {
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
}