import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { CartProvider } from './context/cart.context';

import App from './App';
import { UserProvider } from './context/user.context';
import { CategoriesProvider } from './context/categories.context';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <CategoriesProvider>
      <CartProvider>
           <App />
      </CartProvider>
      </CategoriesProvider>
    </UserProvider>
  </BrowserRouter>,
  
  document.getElementById('root')
);

