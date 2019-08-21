import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/app";

import store from "./_utils/get-redux-store";
import * as serviceWorker from "./serviceWorker";

window.name = "task-manager";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
