import React from 'react';
import AccountComponent from './components/AccountComponent';
import TransactionComponent from './components/TransactionComponent';
import Toast, { showToastSuccess } from './components/Toast';
const App: React.FC = () => {
  const handleAccountCreated = (accountId: number) => {
    showToastSuccess(`Account created with ID: ${accountId}`);
  };

  return (
    <div>
      <h1>Bank App</h1>
      <Toast />
      <AccountComponent onAccountCreated={handleAccountCreated} />
      <TransactionComponent  />
    </div>
  );
};

export default App;