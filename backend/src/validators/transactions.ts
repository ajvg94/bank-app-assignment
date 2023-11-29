import { object, string, number } from 'yup';
import { transactionTypes} from '../types/transactions'

export const createTransactionSchema = object().shape({
    accountNumber: number().positive().required(),
    type: string().oneOf(Object.values(transactionTypes)).required(),
    amount: number().positive().required()
}).noUnknown(true);
