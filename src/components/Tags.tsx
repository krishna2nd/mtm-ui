import React, { Component } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn
} from "office-ui-fabric-react";
import { Routes, IRouteComponent } from "../models/AppModel";

interface ITagItem {
  name: string;
  type: string;
  triggers: string[];
  lastEdited: Date;
}

class Tags extends Component {
  render() {
    const columns: IColumn[] = [
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
      },
      {
        key: "column3",
        name: "Firing Triggers",
        fieldName: "triggers",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        onRender: (item: ITagItem) => item.triggers.join(", ")
      },
      {
        key: "column4",
        name: "Last Edited",
        fieldName: "lastEdited",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        onRender: (item: ITagItem) => item.lastEdited.toLocaleString()
      }
    ];

    const items: ITagItem[] = [
      {
        name: "Tag1",
        type: "Custom HTML",
        triggers: ["t1", "t2"],
        lastEdited: new Date()
      },
      {
        name: "Tag2",
        type: "Deferred HTML",
        triggers: ["t11", "t22"],
        lastEdited: new Date()
      }
    ];
    return (
      <>
        <h2 className={"header-padding"}>Tags</h2>
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
  name: "Tags",
  component: Tags,
  icon: "Tag",
  key: Routes.Tags
} as IRouteComponent;
