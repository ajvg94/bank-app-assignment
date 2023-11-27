import { ErrorTypes, HttpStatusCodes } from "../types/error";
import { HttpStatus } from "../types/httpStatus";
import { ValidationError } from "yup";
import { Response } from "express";


/**
 * Handles the error response from the API.
 *
 * @param {Response} res - The response object.
 * @param {any} error - The error object.
 * @return {Promise<void>} A promise that resolves to void.
 */
export const handleErrorResponse = async (res: Response, error: any): Promise<void> => {
    console.log(`${handleErrorResponse.name}: `, error);
    switch (true) {
        case error instanceof ValidationError:
            res.status(HttpStatusCodes.BAD_REQUEST).send({ status: HttpStatus.ERROR, error: error.errors });
            break;
        case error instanceof Error:
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ status: HttpStatus.ERROR, error });
            break;
        case error === HttpStatusCodes.BAD_REQUEST:
            res.status(HttpStatusCodes.BAD_REQUEST).send({ status: HttpStatus.ERROR, error: ErrorTypes.BAD_REQUEST });
            break;
        case error === HttpStatusCodes.UNAUTHORIZED:
            res.status(HttpStatusCodes.UNAUTHORIZED).send({ status: HttpStatus.ERROR, error: ErrorTypes.UNAUTHORIZED });
            break;
        case error === HttpStatusCodes.FORBIDDEN:
            res.status(HttpStatusCodes.FORBIDDEN).send({ status: HttpStatus.ERROR, error: ErrorTypes.FORBIDDEN });
            break;
        case error === HttpStatusCodes.NOT_FOUND:
            res.status(HttpStatusCodes.NOT_FOUND).send({ status: HttpStatus.ERROR, error: ErrorTypes.NOT_FOUND });
            break;
        case error === HttpStatusCodes.CONFLICT:
            res.status(HttpStatusCodes.CONFLICT).send({ status: HttpStatus.ERROR, error: ErrorTypes.CONFLICT });
            break;
        default:
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ status: HttpStatus.ERROR, error: ErrorTypes.INTERNAL_ERROR });
            break;
    }
};