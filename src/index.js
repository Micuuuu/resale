import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { CartProvider } from './context/cart.context';

import App from './App';
import { UserProvider } from './context/user.context';
import { ShopDataProvider } from './context/shop-data.context';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <ShopDataProvider>
      <CartProvider>
           <App />
      </CartProvider>
      </ShopDataProvider>
    </UserProvider>
  </BrowserRouter>,
  
  document.getElementById('root')
);

