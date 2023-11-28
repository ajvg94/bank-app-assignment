import { NextFunction, Request, Response } from 'express';
import { checkTransactionAmount } from '../../../src/middlewares/checkTransactionAmount';

describe('checkTransactionAmount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log a message for a transaction amount greater than 10,000', () => {
    const mockRequest = {
      params: { accountNumber: '123456' },
      body: { amount: 15000 },
    } as Partial<Request>;

    const mockResponse = {} as Response;
    const mockNext = jest.fn() as NextFunction;
    const consoleLogSpy = jest.spyOn(console, 'log');

    checkTransactionAmount(mockRequest as Request, mockResponse, mockNext);

    expect(consoleLogSpy).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should not log a message for a transaction amount less than or equal to 10,000', () => {
    const mockRequest = {
      params: { accountNumber: '123456' },
      body: { amount: 5000 },
    } as Partial<Request>;

    const mockResponse = {} as Response;
    const mockNext = jest.fn() as NextFunction;
    const consoleLogSpy = jest.spyOn(console, 'log');

    checkTransactionAmount(mockRequest as Request, mockResponse, mockNext);

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should not log a message when the "amount" field is missing in the request body', () => {
    const mockRequest = {
      params: { accountNumber: '123456' },
      body: {  },
    } as Partial<Request>;

    const mockResponse = {} as Response;
    const mockNext = jest.fn() as NextFunction;
    const consoleLogSpy = jest.spyOn(console, 'log');

    checkTransactionAmount(mockRequest as Request, mockResponse, mockNext);

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });
});