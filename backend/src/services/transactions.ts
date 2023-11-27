import TransactionModel  from '../database/transactions.model';
import { Transaction } from '../types/transactions';
import { Account } from '../types/accounts';
import { AccountService } from './accounts';
import { HttpStatusCodes } from '../types/error';

export class TransactionService {
  
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
        await TransactionModel.create({...createTransactionData, accountId: account.id});
        return await AccountService.updateCurrentBalance(createTransactionData, account);
      }
      else throw HttpStatusCodes.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }
}