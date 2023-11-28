import { Request, Response } from 'express';
import { TransactionController } from '../../../src/controllers/transactions'; 
import TransactionService from '../../../src/services/transactions';
import * as TransactionValidator from '../../../src/validators/transactions';
import { Account } from '../../../src/types/accounts';
import { transactionTypes } from '../../../src/types/transactions';
import { handleErrorResponse } from '../../../src/helpers/errorHandler';

jest.mock('../../../src/services/transactions');
jest.mock('../../../src/validators/transactions');
jest.mock('../../../src/helpers/errorHandler');

describe('TransactionController', () => {
  let mockRequest: Request;
  let mockResponse: Response;
  let mockAccount: Account;

  beforeEach(() => {
    // @ts-ignore
    mockRequest = {
        params: { accountNumber: '123' },
        body: {    
          type: transactionTypes.WITHDRAWAL,
          amount: 200 
        } 
    } as Request;

    mockAccount = {
        id: 1,
        name: "cuenta 1",
        accountNumber: 1234567,
        initialBalance: 100,
        currentBalance: 500
    };

    mockResponse = ({
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown) as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransaction', () => {
    it('should create a transaction and send success response when validation passes', async () => {
      (TransactionValidator.createTransactionSchema.validate as jest.Mock).mockReturnValue(Promise.resolve());

      (TransactionService.createTransaction as jest.Mock).mockResolvedValue(mockAccount);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(TransactionValidator.createTransactionSchema.validate).toHaveBeenCalled();
      expect(TransactionService.createTransaction).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({ data: mockAccount, message: 'Transaction created succesfully' });
      expect(handleErrorResponse).not.toHaveBeenCalled();
    });

    it('should handle validation error and send error response', async () => {
      const mockValidationError = new Error('Validation error');
      (TransactionValidator.createTransactionSchema.validate as jest.Mock).mockRejectedValue(mockValidationError);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(TransactionValidator.createTransactionSchema.validate).toHaveBeenCalled();
      expect(TransactionService.createTransaction).not.toHaveBeenCalled();
      expect(handleErrorResponse).toHaveBeenCalledWith(mockResponse, mockValidationError);
    });

    it('should handle service error and send error response', async () => {
      const mockServiceError = new Error('Service error');
      (TransactionValidator.createTransactionSchema.validate as jest.Mock).mockReturnValue(Promise.resolve());
      (TransactionService.createTransaction as jest.Mock).mockRejectedValue(mockServiceError);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(TransactionValidator.createTransactionSchema.validate).toHaveBeenCalled();
      expect(TransactionService.createTransaction).toHaveBeenCalled();
      expect(handleErrorResponse).toHaveBeenCalledWith(mockResponse, mockServiceError);
    });
  });
});