import { Request, Response } from 'express';
import { AccountController } from '../../../src/controllers/accounts'; 
import AccountService from '../../../src/services/accounts';
import * as AccountValidator from '../../../src/validators/accounts';
import { validatorOptions } from '../../../src/validators/validatorOptions';
import { handleErrorResponse } from '../../../src/helpers/errorHandler';

jest.mock('../../../src/services/accounts');
jest.mock('../../../src/validators/accounts');
jest.mock('../../../src/helpers/errorHandler');

describe('AccountController', () => {
  let mockRequest: Request;
  let mockResponse: Response;

  beforeEach(() => {
    mockRequest = {
      body: {   
        name: "cuenta 1",
        accountNumber: 1234567,
        initialBalance: 100
     },
    } as Request;

    mockResponse = ({
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown) as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAccount', () => {
    it('should create an account and send success response when validation passes', async () => {
      (AccountValidator.createAccountSchema.validate as jest.Mock).mockReturnValue(Promise.resolve());

      (AccountService.createAccount as jest.Mock).mockResolvedValue(123);

      await AccountController.createAccount(mockRequest, mockResponse);

      expect(AccountValidator.createAccountSchema.validate).toHaveBeenCalledWith(mockRequest.body, validatorOptions);
      expect(AccountService.createAccount).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({ data: { id: 123 }, message: 'Account created succesfully' });
      expect(handleErrorResponse).not.toHaveBeenCalled();
    });

    it('should handle validation error and send error response', async () => {
      const mockValidationError = new Error('Validation error');
      // Mock validation to reject with an error
      (AccountValidator.createAccountSchema.validate as jest.Mock).mockRejectedValue(mockValidationError);

      await AccountController.createAccount(mockRequest, mockResponse);

      expect(AccountValidator.createAccountSchema.validate).toHaveBeenCalledWith(mockRequest.body, validatorOptions);
      expect(AccountService.createAccount).not.toHaveBeenCalled();
      expect(handleErrorResponse).toHaveBeenCalledWith(mockResponse, mockValidationError);
    });

    it('should handle service error and send error response', async () => {
      const mockServiceError = new Error('Service error');
      // Mock validation passing
      (AccountValidator.createAccountSchema.validate as jest.Mock).mockReturnValue(Promise.resolve());
      // Mock createAccount method to reject with an error
      (AccountService.createAccount as jest.Mock).mockRejectedValue(mockServiceError);

      await AccountController.createAccount(mockRequest, mockResponse);

      expect(AccountValidator.createAccountSchema.validate).toHaveBeenCalledWith(mockRequest.body, validatorOptions);
      expect(AccountService.createAccount).toHaveBeenCalledWith(mockRequest.body);
      expect(handleErrorResponse).toHaveBeenCalledWith(mockResponse, mockServiceError);
    });

  });
});