import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  Selection
} from "office-ui-fabric-react";
import { IRouteComponent, Routes } from "../models/AppModel";
import { connect } from "react-redux";
import { IState } from "../reducers/Root";

interface ITriggerItem {
  name: string;
  eventType: string;
  tags: string[];
  lastEdited: Date;
  filter?: string;
}

const mapStateToProps = (state: IState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setSelectedItem: (item: any) =>
    dispatch({ type: "onTriggerItemSelection", payload: item })
});

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

interface ITriggerProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const Triggers: React.FC<ITriggerProps> = (props: ITriggerProps) => {
  let selectedItem;
  const onSelectionChanged = () => {
    const selectedItem = selection.getSelection()[0];
    props.setSelectedItem(selectedItem);
  };

  const selection = new Selection({
    onSelectionChanged: onSelectionChanged
  });

  return (
    <DetailsList
      items={items}
      className={"table-border"}
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      selectionPreservedOnEmptyClick={true}
      selectionMode={SelectionMode.single}
      selection={selection}
    />
  );
};

const ConnectedTriggers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Triggers);

export default {
  name: "Triggers",
  component: ConnectedTriggers,
  icon: "TriggerAuto",
  key: Routes.Triggers
} as IRouteComponent;
