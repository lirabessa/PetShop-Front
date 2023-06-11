import React from 'react';
import Routes from './src/routes'
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function App() {
  return (
    <>
      <Routes/>
      <Toast/>
    </>
  );
}