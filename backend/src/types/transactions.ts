export enum transactionTypes {
    WITHDRAWAL = 'WITHDRAWAL',
    DEPOSIT = 'DEPOSIT'
}

export interface Transaction {
    id?: number;
    accountNumber: number;
    type: transactionTypes;
    amount: number;
    date?: Date;
}