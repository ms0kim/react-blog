import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      //리덕스 툴킷 사용
      <Provider store={store}>
            <App />
      </Provider>
);