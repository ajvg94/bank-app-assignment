import AccountService from '../../../src/services/accounts';
import { Account } from '../../../src/types/accounts';
import { Transaction, transactionTypes } from '../../../src/types/transactions';
import AccountModel from '../../../src/database/accounts.model';
import Database from '../../../src/database/connection';

jest.mock('../../../src/database/accounts.model', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn()
}));

jest.mock('../../../src/database/connection');

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

describe('AccountService', () => {
  afterEach(() => { jest.clearAllMocks(); });

  describe('getAccountByNumber', () => {
    it('should return an account when given a valid account number', async () => {
      jest.spyOn(Database, 'createNewDatabaseConnection').mockResolvedValue(mockDatabaseConnection);
      (AccountModel.findOne as jest.Mock).mockResolvedValue(mockAccount);

      const result = await AccountService.getAccountByNumber(123456);

      expect(result).toEqual(mockAccount);
      expect(Database.createNewDatabaseConnection).toHaveBeenCalled();
      expect(AccountModel.findOne).toHaveBeenCalledWith({ where: { accountNumber: 123456 } });
      expect(mockDatabaseConnection.close).toHaveBeenCalled();
    });

    it('should throw an error when an error occurs during the database query', async () => {
      const mockError = new Error('Database error');
      (AccountModel.findOne as jest.Mock).mockRejectedValue(mockError);

      await expect(AccountService.getAccountByNumber(123456)).rejects.toThrow(mockError);

      expect(Database.createNewDatabaseConnection).toHaveBeenCalled();
    });
  });

  describe('createAccount', () => {
    it('should create an account and return its ID', async () => {
      jest.spyOn(Database, 'createNewDatabaseConnection').mockResolvedValue(mockDatabaseConnection);
      (AccountModel.create as jest.Mock).mockResolvedValue(mockAccount);

      const result = await AccountService.createAccount(mockAccount);

      expect(result).toEqual(mockAccount.id);
      expect(Database.createNewDatabaseConnection).toHaveBeenCalled();
      expect(AccountModel.create).toHaveBeenCalledWith(mockAccount);
      expect(mockDatabaseConnection.close).toHaveBeenCalled();
    });

    it('should throw an error when an error occurs during the database creation', async () => {
      const mockError = new Error('Database error');
      (AccountModel.create as jest.Mock).mockRejectedValue(mockError);

      await expect(AccountService.createAccount({} as Account)).rejects.toThrow(mockError);

      expect(Database.createNewDatabaseConnection).toHaveBeenCalled();
    });
  });

  describe('updateCurrentBalance', () => {
    it('should update the current balance based on a withdrawal transaction', async () => {
      jest.spyOn(Database, 'createNewDatabaseConnection').mockResolvedValue(mockDatabaseConnection);
      (AccountModel.update as jest.Mock).mockResolvedValue(mockAccount); 

      const result = await AccountService.updateCurrentBalance(mockTransaction, mockAccount);

      expect(result).toEqual(mockAccount);
      expect(Database.createNewDatabaseConnection).toHaveBeenCalled();
      expect(AccountModel.update).toHaveBeenCalled();
      expect(mockDatabaseConnection.close).toHaveBeenCalled();
    });

    it('should update the current balance based on a deposit transaction', async () => {
      jest.spyOn(Database, 'createNewDatabaseConnection').mockResolvedValue(mockDatabaseConnection);
      (AccountModel.update as jest.Mock).mockResolvedValue(mockAccount); 

      const result = await AccountService.updateCurrentBalance(mockTransaction, mockAccount);

      expect(result).toEqual(mockAccount);
      expect(Database.createNewDatabaseConnection).toHaveBeenCalled();
      expect(AccountModel.update).toHaveBeenCalled();
      expect(mockDatabaseConnection.close).toHaveBeenCalled();
    });

    it('should throw an error when an error occurs during the database update', async () => {
      const mockError = new Error('Database error');
      (AccountModel.update as jest.Mock).mockRejectedValue(mockError);

      await expect(AccountService.updateCurrentBalance({} as Transaction, {} as Account)).rejects.toThrow(mockError);

      expect(Database.createNewDatabaseConnection).toHaveBeenCalled();
    });
  });
});