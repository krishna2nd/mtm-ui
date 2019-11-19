import React, { Component } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn
} from "office-ui-fabric-react";
import { IRouteComponent, Routes } from "../models/AppModel";

interface ITriggerItem {
  name: string;
  eventType: string;
  tags: string[];
  lastEdited: Date;
  filter?: string;
}

class Triggers extends Component {
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
        name: "Event Type",
        fieldName: "eventType",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column3",
        name: "Tags",
        fieldName: "tags",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        onRender: (item: ITriggerItem) => item.tags.join(", ")
      },
      {
        key: "column4",
        name: "Last Edited",
        fieldName: "lastEdited",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        onRender: (item: ITriggerItem) => item.lastEdited.toLocaleString()
      },
      {
        key: "column5",
        name: "Filter",
        fieldName: "filter",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      }
    ];

    const items: ITriggerItem[] = [
      {
        name: "Trigger 1",
        eventType: "All Elements",
        tags: ["t1", "t2"],
        lastEdited: new Date(),
        filter: "11"
      },
      {
        name: "Trigger 2",
        eventType: "Button",
        tags: ["t11", "t22"],
        lastEdited: new Date(),
        filter: "22"
      }
    ];
    return (
      <>
        <h2 className={'header-padding'}>Triggers</h2>
        <DetailsList
          items={items}
          className={'table-border'}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionPreservedOnEmptyClick={true}
        />
      </>
    );
  }
}

export default {
  name: "Triggers",
  component: Triggers,
  icon: "TriggerAuto",
  key: Routes.Triggers
};
