import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppProvider} from './context';
import { AddressProvider } from './addressContext';
import {CheckoutProvider} from './checkoutContext';
import {CartProvider} from './cartContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <CartProvider>
        <AddressProvider>
          <CheckoutProvider>
            <App />
          </CheckoutProvider>
        </AddressProvider>
      </CartProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


