import * as React from "react";
import "../App.css";
import { Nav, INavLink, memoizeFunction } from "office-ui-fabric-react";
import { RouteComponentProps, withRouter } from "react-router";
import Router from "../Router";
import { IRouteComponent, Routes } from "../models/AppModel";

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

  React.useEffect(() => {
    Promise.all([
      import("./Tags"),
      import("./Triggers"),
      import("./Variables")
    ]).then(([TagsImport, TriggersImport, VariablesImport]) => {
      setRoutes([
        TagsImport.default,
        TriggersImport.default,
        VariablesImport.default
      ]);
    });
  }, []);

  const onLinkClick = (_?: React.MouseEvent, navLink?: INavLink) => {
    props.history.push(navLink!.link);
    setSelectedRoute(navLink!.link);
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
        <Router
          routes={routes}
          setSelectedRoute={(key: Routes) => setSelectedRoute(key)}
        />
      </div>
    </main>
  );
};

export default withRouter(Main);
