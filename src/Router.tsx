import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { Routes, IRouteComponent, IAnyAction } from "./models/AppModel";
import { MainState } from "./reducers/Main";

interface IRouteAggrProps {
  setSelectedRoute: (key: Routes) => void;
  routes: IRouteComponent[];
  state: MainState;
  dispatch: React.Dispatch<IAnyAction>;
}

const Router: React.FC<IRouteAggrProps> = (props: IRouteAggrProps) => (
  <>
    {props.routes.map((rc: IRouteComponent) => (
      <Route
        path={rc.key}
        exact
        component={() => (
          //@ts-ignore
          <rc.component {...props.state} dispatch={props.dispatch} />
        )}
        key={rc.key}
      />
    ))}
    <Redirect to={Routes.Tags} />
  </>
);

export default Router;
