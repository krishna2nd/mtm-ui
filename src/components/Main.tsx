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
import { connect } from "react-redux";
import { MainReducer, InitialState } from "../reducers/Main";
import { Dispatch } from "redux";
import TagPanel from "./TagPanel";
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

const mapStateToProps = (state: IState) => ({
  isAddPanelVisible: state.main.isAddPanelVisible,
  isDeleteConfirmationDialogVisible:
    state.main.isDeleteConfirmationDialogVisible,
  isEditPanelVisible: state.main.isEditPanelVisible
});

const mapDispatchToProps = (dispatch: any) => ({
  onAddClick: () => dispatch({ type: "onAddClick" }),
  onEditClick: () => dispatch({ type: "onEditClick" }),
  onDeleteClick: () => dispatch({ type: "onDeleteClick" })
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
    if (props.isAddPanelVisible) {
      if (selectedRoute === Routes.Tags) {
        return <TagPanel visible={true} />;
      } else if (selectedRoute === Routes.Triggers) {
        return <TagPanel visible={true} />;
      } else if (selectedRoute === Routes.Variables) {
      }
    } else if (props.isDeleteConfirmationDialogVisible) {
      if (selectedRoute === Routes.Tags) {
      } else if (selectedRoute === Routes.Triggers) {
      } else if (selectedRoute === Routes.Variables) {
      }
    } else if (props.isEditPanelVisible) {
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
              onClick: () => props.onAddClick()
            },
            {
              key: "editRow",
              text: "Edit",
              iconProps: { iconName: "Edit" },
              onClick: () => props.onEditClick()
            },
            {
              key: "deleteRow",
              text: "Delete",
              iconProps: { iconName: "Trash" },
              onClick: () => props.onDeleteClick()
            }
          ]}
        />
        <Router
          routes={routes}
          setSelectedRoute={(key: Routes) => setSelectedRoute(key)}
        ></Router>
      </div>
      {renderPanel()}
    </main>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
