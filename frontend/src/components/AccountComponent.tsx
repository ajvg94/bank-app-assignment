import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

interface AccountComponentProps {
  onAccountCreated: (accountId: number) => void;
}

const AccountComponent: React.FC<AccountComponentProps> = ({ onAccountCreated }) => {
  const [name, setName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<number>(0);
  const [initialBalance, setInitialBalance] = useState<number>(0);

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post(API_URL+'/accounts/', {
        name,
        accountNumber,
        initialBalance,
      });

      onAccountCreated(response.data.data.id);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div>
      <h2>Account Component</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Account Number:</label>
        <input type="number" value={accountNumber} onChange={(e) => setAccountNumber(Number(e.target.value))} />
      </div>
      <div>
        <label>Initial Balance:</label>
        <input type="number" value={initialBalance} onChange={(e) => setInitialBalance(Number(e.target.value))} />
      </div>
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
};

export default AccountComponent;