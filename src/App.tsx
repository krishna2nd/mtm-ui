import * as React from "react";
import "./App.css";
import { initializeIcons } from "office-ui-fabric-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/Root";
import Main from "./components/Main";

initializeIcons();

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <header>
        <h1 className="header">Microsoft Tag Manager</h1>
      </header>
      <Main />
    </BrowserRouter>
  </Provider>
);

export default App;
