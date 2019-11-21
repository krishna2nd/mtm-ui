import React, { useState, useEffect } from "react";
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
    fieldName: "type",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  }
];

interface ITriggerProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const Triggers: React.FC<ITriggerProps> = (props: ITriggerProps) => {
  const [items, setItems] = useState([]);
  const onSelectionChanged = () => {
    const selectedItem = selection.getSelection()[0];
    props.setSelectedItem(selectedItem);
  };

  const selection = new Selection({
    onSelectionChanged: onSelectionChanged
  });

  useEffect(() => {
    fetch("https://ms-tagmanager.azurewebsites.net/triggers")
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
