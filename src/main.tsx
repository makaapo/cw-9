import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer position="bottom-right" />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
