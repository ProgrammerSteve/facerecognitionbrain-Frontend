import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Modal from './components/Modal/Modal';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import './index.css';

ReactDOM.render(
  <React.StrictMode>

    <App />

  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>

    <Modal />

  </React.StrictMode>,
  document.getElementById('modal-root')
);








// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




