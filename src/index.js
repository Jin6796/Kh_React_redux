import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TomatoTalk from './components/talk/TomatoTalk';
import "@fortawesome/fontawesome-free/js/all.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TomatoTalk />
  </React.StrictMode>
);

