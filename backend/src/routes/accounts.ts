import { Router } from "express"
import { AccountController } from '../controllers/accounts';
export const AccountRouter = Router();

AccountRouter.post('/api/accounts/', AccountController.createAccount);