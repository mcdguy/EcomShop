import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AppProvider} from './context';
import {FilterProvider} from './filterContext';
import axios from 'axios';

//i could have done this instead of appendind url to every request
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
//this makes sure i access cookie over cross site
axios.defaults.withCredentials = true

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

