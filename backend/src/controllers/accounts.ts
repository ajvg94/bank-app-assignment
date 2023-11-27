import { Request, Response } from 'express';
import { AccountService } from '../services/accounts';
import * as AccountValidator from "../validators/accounts";
import { validatorOptions } from '../validators/validatorOptions';
import { handleErrorResponse } from "../helpers/errorHandler";

export class AccountController {
  
  
  /**
   * Creates an account.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @return {Promise<void>} - A promise that resolves with no value.
   */
  static async createAccount(req: Request, res: Response) {
    try {
      let accountData = { ...req.body, currentBalance: req.body.initialBalance };
      await AccountValidator.createAccountSchema.validate(accountData, validatorOptions);
      let id = await AccountService.createAccount(accountData);
      res.status(200).send({ data: {id}, message: 'Account created succesfully' });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}