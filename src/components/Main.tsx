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
import { IRouteComponent, Routes } from "../models/AppModel";
import { MainReducer, InitialState } from "../reducers/Main";
import TagPanel from "./TagPanel";

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

interface IMainProps extends RouteComponentProps {}

const Main: React.FC<IMainProps> = (props: IMainProps) => {
  const [selectedRoute, setSelectedRoute] = React.useState(Routes.Tags);
  const [routes, setRoutes] = React.useState([] as IRouteComponent[]);
  const [headerName, setHeaderName] = React.useState("Tags");
  const [state, dispatch] = React.useReducer(MainReducer, InitialState);

  React.useEffect(() => {
    if (routes.length === 0) {
      Promise.all([
        import("./Tags"),
        import("./Triggers"),
        import("./Variables")
      ]).then(imports => setRoutes(imports.map(i => i.default)));
    }
  }, [routes]);

  const onLinkClick = (_?: React.MouseEvent, navLink?: INavLink) => {
    props.history.push(navLink!.link);
    setSelectedRoute(navLink!.link);
    setHeaderName(navLink!.name);
  };

  const renderPanel = (): React.ReactNode => {
    console.log("state.isAddPanelVisible", state.isAddPanelVisible);
    if (state.isAddPanelVisible) {
      if (selectedRoute === Routes.Tags) {
        return <TagPanel visible={true} />;
      } else if (selectedRoute === Routes.Triggers) {
        return <TagPanel visible={true} />;
      } else if (selectedRoute === Routes.Variables) {
      }
    } else if (state.isDeleteConfirmationDialogVisible) {
      if (selectedRoute === Routes.Tags) {
      } else if (selectedRoute === Routes.Triggers) {
      } else if (selectedRoute === Routes.Variables) {
      }
    } else if (state.isEditPanelVisible) {
      if (selectedRoute === Routes.Tags) {
      } else if (selectedRoute === Routes.Triggers) {
      } else if (selectedRoute === Routes.Variables) {
      }
    }
    return;
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
              onClick: () =>
                dispatch({ type: "onAddClick", payload: selectedRoute })
            },
            {
              key: "editRow",
              text: "Edit",
              iconProps: { iconName: "Edit" },
              onClick: () =>
                dispatch({ type: "onEditClick", payload: selectedRoute })
            },
            {
              key: "deleteRow",
              text: "Delete",
              iconProps: { iconName: "Trash" },
              onClick: () =>
                dispatch({ type: "onDeleteClick", payload: selectedRoute })
            }
          ]}
        />
        <Router
          routes={routes}
          state={state}
          dispatch={dispatch}
          setSelectedRoute={(key: Routes) => setSelectedRoute(key)}
        ></Router>
      </div>
      {renderPanel()}
    </main>
  );
};

export default withRouter(Main);
