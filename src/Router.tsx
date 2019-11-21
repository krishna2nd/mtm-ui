import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { Routes, IRouteComponent } from "./models/App";

interface IRouterProps {
  setSelectedRoute: (key: Routes) => void;
  routes: IRouteComponent[];
}

const Router: React.FC<IRouterProps> = (props: IRouterProps) => (
  <>
    {props.routes.map((rc: IRouteComponent) => (
      <Route path={rc.key} exact component={rc.component} key={rc.key} />
    ))}
    <Redirect to={Routes.Tags} />
  </>
);

export default Router;
