export interface Account {
    id?: number;
    accountNumber: number;
    name: string;
    currentBalance: number;
    initialBalance: number;
}

export interface  UpdateCurrentBalanceData{
    accountNumber: number;
    currentBalance: number;
}