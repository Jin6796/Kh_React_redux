import React from "react";
import ReactDOM from "react-dom/client";
// import TomatoTalk from "./components/talk/TomatoTalk";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { legacy_createStore } from "redux";
import { Provider } from "react-redux";
import reducer, { initAuth } from './store';
import ReduxApp from "./ReduxApp";
import "./App.css";
import firebaseApp from "./components/service/firebase";
import AuthLogic from "./components/service/authLogic";
import ReduxRouterApp from "./ReduxRouterApp";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const authLogic = new AuthLogic(firebaseApp);
const store = legacy_createStore(reducer);
store.dispatch(initAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider()));
// store에 담긴 상태 정보 확인하기
console.log(store.getState());
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ReduxRouterApp />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);