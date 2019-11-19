import * as React from "react";
import "./App.css";
import { Nav, initializeIcons, INavLink } from "office-ui-fabric-react";
import { withRouter } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import Triggers from "./components/Triggers";
import Tags from "./components/Tags";
import Variables from "./components/Variables";

initializeIcons();
interface ICustomLink extends INavLink {
  link?: string;
}
const links: ICustomLink[] = [
  {
    name: "Tags",
    link: "/",
    key: "11",
    icon: "Tag",
    url: ""
  },
  {
    name: "Triggers",
    link: "/triggers",
    key: "22",
    icon: "TriggerAuto",
    url: ""
  },
  {
    name: "Variables",
    link: "/variables",
    key: "33",
    icon: "Variable",
    url: ""
  }
];

const App: React.FC<{}> = (props: any) => {
  return (
    <>
      <header>
        <h1 className="header">Microsoft Tag Manager</h1>
      </header>
      <main className="container">
        <aside className="nav-list-container">
          <Nav
            groups={[{ links }]}
            onLinkClick={(
              ev?: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
              item?: ICustomLink | undefined
            ) => onLinkClick(props.history, item)}
          />
        </aside>
        <div className="page-container">
          <Switch>
            <Route path="/triggers" component={() => <Triggers />}></Route>
            <Route path="/variables" component={() => <Variables />}></Route>
            <Route path="/" exact component={() => <Tags />}></Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </main>
    </>
  );
};

const onLinkClick = (history: any, item?: ICustomLink) => {
  history.push((item && item.link) || "");
};

export default withRouter(App);
