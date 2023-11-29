import { handleErrorResponse } from '../../../src/helpers/errorHandler'; 
import { Response } from 'express';
import { HttpStatusCodes, HttpStatus } from '../../../src/types/httpStatus';
import { ValidationError } from 'yup';
import { ErrorTypes } from '../../../src/types/error';

describe('handleErrorResponse', () => {
  let mockResponse: Response;

  beforeEach(() => {
    mockResponse = ({
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown) as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle ValidationError and send BAD_REQUEST status with validation errors', async () => {
    const mockValidationError = new ValidationError('Validation error');
    mockValidationError.errors = ['Field is required'];

    await handleErrorResponse(mockResponse, mockValidationError);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCodes.BAD_REQUEST);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.ERROR,
      error: mockValidationError.errors[0],
    });
  });

  it('should handle INSUFFICIENT_FUNDS error and send BAD_REQUEST status with appropriate error type', async () => {
    const mockError = ErrorTypes.INSUFFICIENT_FUNDS;

    await handleErrorResponse(mockResponse, mockError);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCodes.BAD_REQUEST);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.ERROR,
      error: ErrorTypes.INSUFFICIENT_FUNDS,
    });
  });

  it('should handle other Error and send INTERNAL_SERVER_ERROR status with the error object', async () => {
    const mockError = new Error('Generic error message');

    await handleErrorResponse(mockResponse, mockError);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.ERROR,
      error: mockError,
    });
  });

  it('should handle BAD_REQUEST status with appropriate error type', async () => {
    const mockError = HttpStatusCodes.BAD_REQUEST;

    await handleErrorResponse(mockResponse, mockError);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCodes.BAD_REQUEST);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.ERROR,
      error: ErrorTypes.BAD_REQUEST,
    });
  });

  it('should handle UNAUTHORIZED status with appropriate error type', async () => {
    const mockError = HttpStatusCodes.UNAUTHORIZED;

    await handleErrorResponse(mockResponse, mockError);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCodes.UNAUTHORIZED);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.ERROR,
      error: ErrorTypes.UNAUTHORIZED,
    });
  });

  it('should handle FORBIDDEN status with appropriate error type', async () => {
    const mockError = HttpStatusCodes.FORBIDDEN;

    await handleErrorResponse(mockResponse, mockError);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCodes.FORBIDDEN);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.ERROR,
      error: ErrorTypes.FORBIDDEN,
    });
  });

  it('should handle NOT_FOUND status with appropriate error type', async () => {
    const mockError = HttpStatusCodes.NOT_FOUND;

    await handleErrorResponse(mockResponse, mockError);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCodes.NOT_FOUND);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.ERROR,
      error: ErrorTypes.NOT_FOUND,
    });
  });

  it('should handle NOT_FOUND status with appropriate error type', async () => {
    const mockError = HttpStatusCodes.CONFLICT;

    await handleErrorResponse(mockResponse, mockError);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCodes.CONFLICT);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.ERROR,
      error: ErrorTypes.CONFLICT,
    });
  });
});