import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Nav } from "office-ui-fabric-react";

const App: React.FC = () => {
  return (
    <>
      <header>
        <h1 style={{textAlign: 'center'}}>Microsoft Tag Manager</h1>
      </header>
      <div className="App">
        <Nav
          groups={[
            {
              links: [
                { name: "Tags", url: "/tags/", key: "11", icon: "Tag" },
                {
                  name: "Triggers",
                  url: "/triggers/",
                  key: "22",
                  icon: "TriggerAuto"
                },
                {
                  name: "Variables",
                  url: "/variables/",
                  key: "33",
                  icon: "Variable"
                }
              ]
            }
          ]}
        />
      </div>
    </>

  );
};

export default App;
