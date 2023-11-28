import AccountService from '../../../src/services/accounts';
import TransactionService from '../../../src/services/transactions';
import { Account } from '../../../src/types/accounts';
import { HttpStatusCodes } from '../../../src/types/httpStatus'
import { Transaction, transactionTypes } from '../../../src/types/transactions';
import TransactionModel from '../../../src/database/transactions.model';
import Database from '../../../src/database/connection';

jest.mock('../../../src/services/accounts');
jest.mock('../../../src/database/connection');
jest.mock('../../../src/database/transactions.model', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
}));

const mockDatabaseConnection: any = {
    close: jest.fn(),
    sync: jest.fn()
};

const mockAccount: Account = {
    id: 1,
    name: "cuenta 1",
    accountNumber: 1234567,
    initialBalance: 100,
    currentBalance: 500
};

const mockTransaction: Transaction = {
  accountNumber: 1234567,
  type: transactionTypes.WITHDRAWAL,
  amount: 200
};

const mockUpdatedAccount = {
    ...mockAccount,
    currentBalance: mockAccount.currentBalance + mockTransaction.amount,
};

describe('TransactionService', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('createTransaction', () => {
      it('should create a withdrawal transaction and return the updated account balance', async () => {
        jest.spyOn(AccountService, 'getAccountByNumber').mockResolvedValue(mockAccount);
        jest.spyOn(AccountService, 'updateCurrentBalance').mockResolvedValue(mockUpdatedAccount);
        jest.spyOn(TransactionModel, 'create').mockResolvedValue(true);
        jest.spyOn(Database, 'createNewDatabaseConnection').mockResolvedValue(mockDatabaseConnection);
  
        const result = await TransactionService.createTransaction(mockTransaction);
  
        expect(result).toEqual(mockUpdatedAccount);
        expect(AccountService.getAccountByNumber).toHaveBeenCalled();
        expect(AccountService.updateCurrentBalance).toHaveBeenCalled();
        expect(TransactionModel.create).toHaveBeenCalled();
        expect(Database.createNewDatabaseConnection).toHaveBeenCalled();
      });
  
      it('should create a deposit transaction and return the updated account balance', async () => {
        jest.spyOn(AccountService, 'getAccountByNumber').mockResolvedValue(mockAccount);
        jest.spyOn(AccountService, 'updateCurrentBalance').mockResolvedValue(mockUpdatedAccount);
        jest.spyOn(TransactionModel, 'create').mockResolvedValue(true);
        jest.spyOn(Database, 'createNewDatabaseConnection').mockResolvedValue(mockDatabaseConnection);
  
        const result = await TransactionService.createTransaction(mockTransaction);
  
        expect(result).toEqual(mockUpdatedAccount);
        expect(AccountService.getAccountByNumber).toHaveBeenCalled();
        expect(AccountService.updateCurrentBalance).toHaveBeenCalled();
        expect(TransactionModel.create).toHaveBeenCalled();
        expect(Database.createNewDatabaseConnection).toHaveBeenCalled();
      });
  
      it('should throw HttpStatusCodes.NOT_FOUND when the account is not found', async () => {
        // @ts-ignore
        jest.spyOn(AccountService, 'getAccountByNumber').mockResolvedValue(null);
        jest.spyOn(AccountService, 'updateCurrentBalance').mockResolvedValue(mockUpdatedAccount);
        jest.spyOn(Database, 'createNewDatabaseConnection').mockResolvedValue(mockDatabaseConnection);
  
        await expect(TransactionService.createTransaction(mockTransaction)).rejects.toEqual(HttpStatusCodes.NOT_FOUND);
  
        expect(AccountService.getAccountByNumber).toHaveBeenCalledWith(mockTransaction.accountNumber);

        expect(AccountService.updateCurrentBalance).not.toHaveBeenCalled();
        expect(TransactionModel.create).not.toHaveBeenCalled();
        expect(Database.createNewDatabaseConnection).not.toHaveBeenCalled();
      });
    });
});