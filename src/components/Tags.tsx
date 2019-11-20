import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  Selection
} from "office-ui-fabric-react";
import { Routes, IRouteComponent } from "../models/AppModel";
import { connect } from "react-redux";
import { IState } from "../reducers/Root";

export interface ITagItem {
  name: string;
  type: string;
  triggers: string[];
  lastEdited: Date;
}

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

const mapStateToProps = (state: IState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setSelectedItem: (item: any) =>
    dispatch({ type: "onItemSelection", payload: item })
});

interface ITagsProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const Tags: React.FC<ITagsProps> = (props: ITagsProps) => {
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
      selection={selection}
      selectionPreservedOnEmptyClick={true}
      selectionMode={SelectionMode.single}
    />
  );
};

const ConnectedTags = connect(mapStateToProps, mapDispatchToProps)(Tags);
export default {
  name: "Tags",
  component: ConnectedTags,
  icon: "Tag",
  key: Routes.Tags
} as IRouteComponent;
