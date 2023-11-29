import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export const showToastSuccess = (message: string) => {
  toast.success(message, { position: 'top-right' });
};

export const showToastError = (message: string) => {
  toast.error(message, { position: 'top-right' });
};

export default Toast;