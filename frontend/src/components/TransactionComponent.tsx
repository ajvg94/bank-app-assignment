import React, { useState } from 'react';
import axios from 'axios';
import { showToastSuccess, showToastError } from './Toast';
import { errorResponse } from '../types/error';

const API_URL = process.env.REACT_APP_API_URL;

interface TransactionComponentProps {
}

const TransactionComponent: React.FC<TransactionComponentProps> = () => {
  const [amount, setAmount] = useState<number>(0);
  const [accountNumber, setAccountNumber] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<string>('DEPOSIT');
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  const handleTransaction = async () => {
    try {
      const response = await axios.post(`${API_URL}/accounts/${accountNumber}/transactions/`, {
        amount,
        type: transactionType,
      });

      setCurrentBalance(response.data.data.currentBalance);
      showToastSuccess('Transaction successful!');
    } catch (error) {
      let errorMessage = error as errorResponse
      console.error(errorMessage?.response?.data?.error)
      showToastError('Transaction failed: '+ errorMessage?.response?.data?.error);
    }
  };

  return (
    <div>
      <h2>Transaction Component</h2>
      <div>
        <label>Account Number:</label>
        <input type="number" value={accountNumber} onChange={(e) => setAccountNumber(Number(e.target.value))} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </div>
      <div>
        <label>Transaction Type:</label>
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="DEPOSIT">Deposit</option>
          <option value="WITHDRAWAL">Withdrawal</option>
        </select>
      </div>
      <button onClick={handleTransaction}>Submit Transaction</button>
      <p>Current Balance: {currentBalance}</p>
    </div>
  );
};

export default TransactionComponent;