import { IRouteComponent, Routes } from 'models/App';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface IRouterProps {
  setSelectedRoute: (key: Routes) => void;
  routes: IRouteComponent[];
}

export default (props: IRouterProps) => (
  <>
    {props.routes.map((rc: IRouteComponent) => (
      <Route path={rc.key} exact component={rc.component} key={rc.key} />
    ))}
    <Redirect to={Routes.Tags} />
  </>
);
