import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AppProvider} from './context';
import {FilterProvider} from './filterContext';

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

