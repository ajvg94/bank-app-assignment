
import { Request, Response, NextFunction } from 'express';
/**
 * Checks the transaction ammount.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Promise<void>} - Promise that resolves to void.
 */
export const checkTransactionAmount =  (req: Request, res: Response, next: NextFunction) => {
    const transactionData = { accountNumber: +req.params.accountId, ...req.body };
    if(transactionData.amount > 10000)   {
        console.log(`Middleware: Registered a transaction greater than 10,000 US$. \n ${JSON.stringify(transactionData)}`);
    }
    next();
};