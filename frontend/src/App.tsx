import React from 'react';
import AccountComponent from './components/AccountComponent';
import TransactionComponent from './components/TransactionComponent';

const App: React.FC = () => {
  const handleAccountCreated = (accountId: number) => {
    console.log(`Account created with ID: ${accountId}`);
  };

  return (
    <div>
      <h1>Bank App</h1>
      <AccountComponent onAccountCreated={handleAccountCreated} />
      <TransactionComponent  />
    </div>
  );
};

export default App;