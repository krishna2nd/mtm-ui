export enum Routes {
  Triggers = "/triggers",
  Variables = "/variables",
  Tags = "/"
}

export interface IRouteComponent {
  key: Routes;
  name: string;
  component: React.ComponentClass | React.FC;
  icon: string;
}

export interface IAnyAction<P = any> {
  type: string;
  payload?: P;
}
