import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

// 우리의 버킷리스트에 리덕스를 주입해줄 프로바이더를 불러옵니다!
import { Provider } from "react-redux";
// 연결할 스토어도 가지고 와요.
import store from "./redux/configStore";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
