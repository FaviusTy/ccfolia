import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import "./styles/index.css";

// For iOS
let t = null;
window.addEventListener(
  "touchend",
  e => {
    const now = Date.now();
    if (now - t < 500) {
      e.preventDefault();
    } else {
      t = now;
    }
  },
  { passive: false, capture: false }
);

// document.getElementById("root").addEventListener(
//   "touchmove",
//   e => {
//     e.preventDefault();
//   },
//   { passive: false, capture: false }
// );

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();

// function scrollDisabled(e) {
//   e.preventDefault()
// }

// document.addEventListener('touchmove', scrollDisabled, { passive: false })
