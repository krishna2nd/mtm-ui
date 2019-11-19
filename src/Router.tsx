import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Triggers from "./components/Triggers";
import Tags from "./components/Tags";
import VariableComponent from "./components/Variables";

export const Router: React.FC = props => (
  <BrowserRouter>
    <Switch>
      <Route path="/triggers" component={() => <Triggers />}></Route>
      <Route path="/variables" component={() => <VariableComponent/>}></Route>
      <Route path="/" exact component={() => <Tags />}></Route>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);
