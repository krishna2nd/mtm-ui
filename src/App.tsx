import * as React from "react";
import "./App.css";
import { initializeIcons } from "office-ui-fabric-react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";

initializeIcons();
const App: React.FC = () => (
  <BrowserRouter>
    <header>
      <h1 className="header">Microsoft Tag Manager</h1>
    </header>
    <Main />
  </BrowserRouter>
);

export default App;
