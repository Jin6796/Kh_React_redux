import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TomatoTalk from "./components/talk/TomatoTalk";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { legacy_createStore } from "redux";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
// store에 담긴 상태 정보 확인하기
console.log(store.getState());
const store = legacy_createStore(reducer);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);