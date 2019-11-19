export enum Routes {
  Triggers = "/triggers",
  Variables = "/variables",
  Tags = "/"
}

export interface IRouteComponent {
  key: Routes;
  name: string;
  component: React.ComponentClass;
  icon: string;
}
