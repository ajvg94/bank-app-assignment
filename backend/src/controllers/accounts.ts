import { Request, Response } from 'express';
import { AccountService } from '../services/accounts';
import * as AccountValidator from "../validators/accounts";
import { validatorOptions } from '../validators/validatorOptions';
import { handleErrorResponse } from "../helpers/errorHandler";

export class AccountController {
  /**
   * Creates an account using the provided account data.
   *
   * @param {Account} createAccountData - The account data used to create the account.
   * @return {Promise<void>} A promise that resolves when the account is created successfully.
   */
  static async createAccount(req: Request, res: Response) {
    try {
        let accountData = { ...req.body, currentBalance: req.body.initialBalance };
        await AccountValidator.createAccountSchema.validate(accountData, validatorOptions);
        let createdAccountId = await AccountService.createAccount(accountData);
        res.status(200).send({ data: createdAccountId, message: 'Account created succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
  }
}