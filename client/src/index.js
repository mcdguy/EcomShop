import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppProvider} from './context';
import { AddressProvider } from './addressContext';
import {CheckoutProvider} from './checkoutContext';
import {CartProvider} from './cartContext';
import App from './App';
import axios from 'axios';
// if(process.env.NODE_ENV === 'production'){
//   axios.defaults.baseURL = 'https://sbcoffeecompany.herokuapp.com';
// }
axios.defaults.withCredentials = true
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


