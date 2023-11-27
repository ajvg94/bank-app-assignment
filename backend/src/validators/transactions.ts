import { object, string, number, date } from 'yup';
import { transactionTypes} from '../types/transactions'

export const createTransactionSchema = object().shape({
    accountNumber: number().required(),
    type: string().oneOf(Object.values(transactionTypes)).required(),
    amount: number().required()
}).noUnknown(true);
