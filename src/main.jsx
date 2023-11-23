import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';




import App from './components/App.jsx'
import rootReducer from './store/reducers/index.js';

import './assets/styles/main.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const persistConfig = {
  key: 'root', // key is required
  storage, // storage is required
  // You can configure additional options here, such as blacklist or whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// );
