import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Routes, IRouteComponent } from "../models/AppModel";

export interface IVariableItem {
  key: number;
  name: string;
  type: string;
}

class Variables extends React.Component {
  public render(): JSX.Element {
    const columns = [
      {
        key: "column1",
        name: "Name",
        fieldName: "name",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column2",
        name: "Type",
        fieldName: "type",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      }
    ];

    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        key: i,
        type: "type " + i,
        name: "Name " + i
      });
    }

    return (
      <>
        <h2 className={"header-padding"}>Variables</h2>
        <DetailsList
          items={items}
          className={"table-border"}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionPreservedOnEmptyClick={true}
        />
      </>
    );
  }
}

export default {
  name: "Variables",
  component: Variables,
  icon: "Variable",
  key: Routes.Variables
} as IRouteComponent;
