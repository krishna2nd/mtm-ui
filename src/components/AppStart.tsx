import { IRouteComponent, Routes } from 'models/App';
import {
  CommandBar,
  DefaultPalette,
  INavLink,
  memoizeFunction,
  mergeStyles,
  Nav
} from 'office-ui-fabric-react';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { IState } from 'reducers/Root';
import { Dispatch } from 'redux';

import Router from './Router';

const getNavLinks = memoizeFunction((routes: IRouteComponent[]) =>
  routes.map(
    ({ name, key, icon }: IRouteComponent): INavLink => ({
      name,
      key,
      icon,
      url: '',
      link: key
    })
  )
);

const mapStateToProps = (state: IState) => state.main;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddClick: () => dispatch({ type: 'onAddClick' }),
  onEditClick: () => dispatch({ type: 'onEditClick' }),
  onDeleteClick: () => dispatch({ type: 'onDeleteClick' }),
  onRouteChange: () => dispatch({ type: 'onRouteChange' })
});

interface IMainProps
  extends RouteComponentProps,
    ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const Main: FC<IMainProps> = (props: IMainProps) => {
  const [selectedRoute, setSelectedRoute] = useState(Routes.Tags);
  const [routes, setRoutes] = useState([] as IRouteComponent[]);
  const [headerName, setHeaderName] = useState('Tags');

  useEffect(() => {
    Promise.all([
      import('./Tags/Tags'),
      import('./Triggers/Triggers'),
      import('./Variables/Variables')
    ]).then(imports => setRoutes(imports.map(i => i.default)));
  }, []);

  const onLinkClick = (_?: MouseEvent, navLink?: INavLink) => {
    props.history.push(navLink!.link);
    setSelectedRoute(navLink!.link);
    setHeaderName(navLink!.name);
    props.onRouteChange();
  };

  return (
    <>
      <header
        className={mergeStyles({
          textAlign: 'center',
          borderBottom: '1px solid',
          borderColor: DefaultPalette.neutralQuaternaryAlt
        })}
      >
        <h1>MS TagM o'metry</h1>
      </header>
      <main
        className={mergeStyles({
          display: 'flex',
          height: '100vh',
          overflow: 'hidden'
        })}
      >
        <aside
          className={mergeStyles({
            flexBasis: '12%',
            borderRight: '1px solid',
            borderColor: DefaultPalette.neutralQuaternaryAlt
          })}
        >
          <Nav
            groups={[{ links: getNavLinks(routes) }]}
            selectedKey={selectedRoute}
            onLinkClick={onLinkClick}
          />
        </aside>
        <div
          className={mergeStyles({
            flex: 1,
            borderBottom: '1px solid',
            borderColor: DefaultPalette.neutralQuaternaryAlt
          })}
        >
          <h2 className={mergeStyles({ paddingLeft: '34px' })}>{headerName}</h2>
          <CommandBar
            items={[
              {
                key: 'addRow',
                text: 'Add',
                iconProps: { iconName: 'Add' },
                onClick: () => {
                  props.onAddClick();
                }
              },
              {
                key: 'editRow',
                text: 'Edit',
                disabled: !props.hasSelectedItem,
                iconProps: { iconName: 'Edit' },
                onClick: () => {
                  props.onEditClick();
                }
              },
              {
                key: 'deleteRow',
                text: 'Delete',
                disabled: !props.hasSelectedItem,
                iconProps: { iconName: 'Trash' },
                onClick: () => {
                  props.onDeleteClick();
                }
              }
            ]}
          />
          <Router
            routes={routes}
            setSelectedRoute={(key: Routes) => {
              setSelectedRoute(key);
              props.onRouteChange();
            }}
          />
        </div>
      </main>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
