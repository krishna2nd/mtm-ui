import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Nav, initializeIcons } from "office-ui-fabric-react";
import { Router } from './Router';

initializeIcons();
const links = [
  { name: "Tags", url: "/", key: "11", icon: "Tag" },
  {
    name: "Triggers",
    url: "/triggers",
    key: "22",
    icon: "TriggerAuto"
  },
  {
    name: "Variables",
    url: "/variables",
    key: "33",
    icon: "Variable"
  }
]

const App: React.FC = () => {
  return (
    <>
      <header>
        <h1 className="header">Microsoft Tag Manager</h1>
      </header>
      <main className="container">
        <aside className="nav-list-container">
          <Nav groups={[{ links }]} />
        </aside>
        <div className="page-container"><Router /></div>
      </main>
    </>
  );
};

export default App;
