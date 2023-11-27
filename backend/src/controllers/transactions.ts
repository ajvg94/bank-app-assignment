import { Request, Response } from 'express';
import { TransactionService } from '../services/transactions';
import * as TransactionValidator from "../validators/transactions";
import { validatorOptions } from '../validators/validatorOptions';
import { handleErrorResponse } from "../helpers/errorHandler";

export class TransactionController {
  
    /**
     * Creates a new transaction based on the provided request data.
     *
     * @param {Request} req - The request object containing transaction data.
     * @param {Response} res - The response object used to send a response to the client.
     * @return {Promise<void>} - A promise that resolves when the transaction is created.
    */
    static async createTransaction(req: Request, res: Response) {
        try {
            const transactionData = { accountNumber: +req.params.accountId, ...req.body };
            await TransactionValidator.createTransactionSchema.validate(transactionData, validatorOptions);
            let accountData = await TransactionService.createTransaction(transactionData);
            res.status(200).send({ data: accountData, message: 'Transaction created succesfully' });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
}