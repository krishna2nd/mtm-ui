import AppStart from "components/AppStart";
import { initializeIcons } from "office-ui-fabric-react";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "reducers/Root";

initializeIcons();

document.title = "Microsoft Tag Manager";

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppStart />
    </BrowserRouter>
  </Provider>
);
