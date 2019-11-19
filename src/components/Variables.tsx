import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode
} from "office-ui-fabric-react/lib/DetailsList";

export interface IVariableItem {
  key: number;
  name: string;
  type: string;
}

export default class Variables extends React.Component {
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
      <DetailsList
        items={items}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionPreservedOnEmptyClick={true}
      />
    );
  }
}
