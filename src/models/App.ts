export enum Routes {
  Triggers = '/triggers',
  Variables = '/variables',
  Tags = '/'
}

export interface IRouteComponent {
  key: Routes;
  name: string;
  component: React.ComponentClass | React.FC;
  icon: string;
}

/* tslint:disable-next-line:no-any */
export interface IMTMAction<P = any> {
  type: string;
  payload?: P;
}

export interface IWithId {
  id: number;
}

export enum Status {
  NotYetStarted,
  Loading,
  Completed,
  Failed
}
