import React, { useState, useEffect } from "react";
import { IRouteComponent, Routes } from "../../models/App";
import { connect } from "react-redux";
import { IState } from "../../reducers/Root";
import TriggerPanel from "./TriggerPanel";
import { ITriggersState } from "../../reducers/Triggers";
import { ITriggerItem } from "../../models/Triggers";
import MTMList, { PartialColumn } from "../Presentational/MTMList";
import { getTriggersList } from "../../service/Api";

const columns: PartialColumn[] = [
  {
    name: "Name",
    fieldName: "name"
  },
  {
    name: "Event Type",
    fieldName: "type"
  },
  {
    name: "Body",
    fieldName: "body"
  }
];

const mapStateToProps = (state: IState) => state.triggers;

interface ITriggerProps extends ITriggersState {}

const Triggers: React.FC<ITriggerProps> = (props: ITriggerProps) => {
  const [items, setItems] = useState([] as ITriggerItem[]);

  const fetchItems = () => {
    getTriggersList().then(setItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <MTMList items={items} columns={columns} />
      {props.isPanelOpen && <TriggerPanel {...props.selectedItem} />}
    </>
  );
};

export default {
  name: "Triggers",
  component: connect(mapStateToProps)(Triggers),
  icon: "TriggerAuto",
  key: Routes.Triggers
} as IRouteComponent;
