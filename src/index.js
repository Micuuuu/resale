import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
// import { UserProvider } from './context/user.context';
// import { CategoriesProvider } from './context/categories.context';

import { store, persistor } from './store/store';
import './index.css';

ReactDOM.render(
  <Provider store = {store}>
    <PersistGate loading = {null } persistor = {persistor}>
      <BrowserRouter>
        {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
          {/* <CartProvider> */}
              <App />
          {/* </CartProvider> */}
          {/* </CategoriesProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

