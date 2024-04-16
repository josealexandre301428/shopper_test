import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProductProvider from './context/product/provider';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ProductProvider>
    <App />
  </ProductProvider>,
  document.getElementById('root')
);

reportWebVitals();
