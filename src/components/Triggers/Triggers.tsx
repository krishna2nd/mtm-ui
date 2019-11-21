import React, { useState, useEffect } from "react";
import { IRouteComponent, Routes } from "../../models/App";
import { connect } from "react-redux";
import { IState } from "../../reducers/Root";
import TriggerPanel from "./TriggerPanel";
import { TriggersState } from "../../reducers/Triggers";
import { ITriggerItem, TriggerItem } from "../../models/Triggers";
import { Dispatch } from "redux";
import MTMList, { PartialColumn } from "../Presentational/MTMList";

const mapStateToProps = (state: IState) => state.triggers;

const columns: PartialColumn[] = [
  {
    name: "Name",
    fieldName: "name"
  },
  {
    name: "Event Type",
    fieldName: "type"
  }
];

interface ITriggerProps extends TriggersState {}

const Triggers: React.FC<ITriggerProps> = (props: ITriggerProps) => {
  const [items, setItems] = useState([] as ITriggerItem[]);

  useEffect(() => {
    fetch("https://ms-tagmanager.azurewebsites.net/triggers")
      .then(res => res.json())
      .then(
        response =>
          setItems(response.map((item: object) => new TriggerItem(item))),
        error => console.error(error)
      );
  }, []);

  return (
    <>
      <MTMList items={items} columns={columns} />
      {props.isTriggerPanelOpen && <TriggerPanel {...props.selectedItem} />}
    </>
  );
};

export default {
  name: "Triggers",
  component: connect(mapStateToProps)(Triggers),
  icon: "TriggerAuto",
  key: Routes.Triggers
} as IRouteComponent;
