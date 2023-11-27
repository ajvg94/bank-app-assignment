import { Request, Response } from 'express';
import { TransactionService } from '../services/transactions';
import * as TransactionValidator from "../validators/transactions";
import { validatorOptions } from '../validators/validatorOptions';
import { handleErrorResponse } from "../helpers/errorHandler";

export class TransactionController {
  
    
    /**
     * Creates a transaction.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @return {Promise<void>} Returns a promise that resolves when the transaction is created successfully.
     */
    static async createTransaction(req: Request, res: Response) {
        try {
            const transactionData = { accountNumber: +req.params.accountNumber, ...req.body };
            await TransactionValidator.createTransactionSchema.validate(transactionData, validatorOptions);
            let accountData = await TransactionService.createTransaction(transactionData);
            res.status(200).send({ data: accountData, message: 'Transaction created succesfully' });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
}