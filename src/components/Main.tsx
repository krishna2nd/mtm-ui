import * as React from "react";
import "../App.css";
import {
  Nav,
  INavLink,
  memoizeFunction,
  CommandBar
} from "office-ui-fabric-react";
import { RouteComponentProps, withRouter } from "react-router";
import Router from "../Router";
import { IRouteComponent, Routes } from "../models/App";
import { connect } from "react-redux";
import { IState } from "../reducers/Root";

const getNavLinks = memoizeFunction((routes: IRouteComponent[]) =>
  routes.map(
    ({ name, key, icon }: IRouteComponent): INavLink => ({
      name,
      key,
      icon,
      url: "",
      link: key
    })
  )
);

const mapStateToProps = (state: IState) => state.main;

const mapDispatchToProps = (dispatch: any) => ({
  onAddClick: () => dispatch({ type: "onAddClick" }),
  onEditClick: () => dispatch({ type: "onEditClick" }),
  onDeleteClick: () => dispatch({ type: "onDeleteClick" }),
  onRouteChange: () => dispatch({ type: "onRouteChange" })
});

interface IMainProps
  extends RouteComponentProps,
    ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const Main: React.FC<IMainProps> = (props: IMainProps) => {
  const [selectedRoute, setSelectedRoute] = React.useState(Routes.Tags);
  const [routes, setRoutes] = React.useState([] as IRouteComponent[]);
  const [headerName, setHeaderName] = React.useState("Tags");

  React.useEffect(() => {
    if (routes.length === 0) {
      Promise.all([
        import("./Tags/Tags"),
        import("./Triggers/Triggers"),
        import("./Variables/Variables")
      ]).then(imports => setRoutes(imports.map(i => i.default)));
    }
  }, [routes]);

  const onLinkClick = (_?: React.MouseEvent, navLink?: INavLink) => {
    props.history.push(navLink!.link);
    setSelectedRoute(navLink!.link);
    setHeaderName(navLink!.name);
    props.onRouteChange();
  };

  return (
    <main className="container">
      <aside className="nav-list-container">
        <Nav
          groups={[{ links: getNavLinks(routes) }]}
          selectedKey={selectedRoute}
          onLinkClick={onLinkClick}
        />
      </aside>
      <div className="page-container">
        <h2 className={"header-padding"}>{headerName}</h2>
        <CommandBar
          items={[
            {
              key: "addRow",
              text: "Add",
              iconProps: { iconName: "Add" },
              onClick: () => props.onAddClick()
            },
            {
              key: "editRow",
              text: "Edit",
              disabled: !props.hasSelectedItem,
              iconProps: { iconName: "Edit" },
              onClick: () => props.onEditClick()
            },
            {
              key: "deleteRow",
              text: "Delete",
              disabled: !props.hasSelectedItem,
              iconProps: { iconName: "Trash" },
              onClick: () => props.onDeleteClick()
            }
          ]}
        />
        <Router
          routes={routes}
          setSelectedRoute={(key: Routes) => {
            setSelectedRoute(key);
            props.onRouteChange();
          }}
        ></Router>
      </div>
    </main>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
