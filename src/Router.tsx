import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import VariableComponent from "./VariableComponent";

export const Router: React.FC = (props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/triggers" component={() => <div>Triggers</div>}></Route>
      <Route path="/variables" component={() => <VariableComponent/>}></Route>
      <Route path="/" exact component={() => <div>Tags</div>}></Route>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);
