import { object, string, number } from 'yup';

export const createAccountSchema = object().shape({
    name: string().required(),
    accountNumber: number().positive().required(),
    initialBalance: number().positive().required()
}).noUnknown(true);
