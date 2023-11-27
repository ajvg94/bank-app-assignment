import { Router } from "express"
import { AccountController } from '../controllers/accounts';
export const AccountsRouter = Router();

AccountsRouter.post('/api/accounts/', AccountController.createAccount);