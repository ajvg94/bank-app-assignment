import { object, string, number } from 'yup';

export const createAccountSchema = object().shape({
    name: string().required(),
    number: number().required(),
    initialBalance: number().required(),
    currentBalance: number().required()
}).noUnknown(true);
