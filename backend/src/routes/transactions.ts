import { Router } from "express";
import { TransactionController } from '../controllers/transactions';
import { checkTransactionAmount } from '../middlewares/checkTransactionAmount';
export const TransactionRouter = Router();

TransactionRouter.post('/api/accounts/:accountNumber/transactions/', checkTransactionAmount, TransactionController.createTransaction);