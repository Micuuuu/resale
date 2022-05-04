import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
//stripe
import { Elements } from '@stripe/react-stripe-js';
// import { UserProvider } from './context/user.context';
// import { CategoriesProvider } from './context/categories.context';

import { store, persistor } from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils';
import './index.css';

ReactDOM.render(
  <Provider store = {store}>
    <PersistGate loading = {null } persistor = {persistor}>
      <BrowserRouter>
        {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
          {/* <CartProvider> */}
          <Elements stripe = {stripePromise}>
              <App />
          </Elements>
          {/* </CartProvider> */}
          {/* </CategoriesProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

