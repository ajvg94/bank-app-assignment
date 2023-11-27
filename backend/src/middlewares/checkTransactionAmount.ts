
import { Request, Response, NextFunction } from 'express';

/**
 * Checks the transaction amount and logs a message if it is greater than 10,000 US$.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void} This function does not return anything.
 */
export const checkTransactionAmount =  (req: Request, res: Response, next: NextFunction) => {
    const transactionData = { accountNumber: +req.params.accountNumber, ...req.body };
    if(transactionData.amount > 10000)   {
        console.log(`Middleware: Registered a transaction greater than 10,000 US$. \n ${JSON.stringify(transactionData)}`);
    }
    next();
};