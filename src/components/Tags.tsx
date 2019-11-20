import React, { useState, useEffect } from "react";
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

const mapStateToProps = (state: IState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setSelectedItem: (item: any) =>
    dispatch({ type: "onTagItemSelection", payload: item })
});

interface ITagsProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const Tags: React.FC<ITagsProps> = (props: ITagsProps) => {
  const [items, setItems] = useState([]);
  const onSelectionChanged = () => {
    const selectedItem = selection.getSelection()[0];
    props.setSelectedItem(selectedItem);
  };

  const selection = new Selection({
    onSelectionChanged: onSelectionChanged
  });

  useEffect(() => {
    fetch("https://ms-tagmanager.azurewebsites.net/tags")
      .then(res => res.json())
      .then(
        result => {
          setItems(result);
        },
        error => {
          console.log(error);
        }
      );
  }, []);

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
