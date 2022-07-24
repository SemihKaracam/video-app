import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from './redux/store';
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from 'react-redux';
import ScrollToTop from "./ScrollToTop.js"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
