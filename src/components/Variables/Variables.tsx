import React, { useState, useEffect } from "react";
import { Routes, IRouteComponent } from "../../models/App";
import { connect } from "react-redux";
import { IState } from "../../reducers/Root";
import VariablePanel from "./VariablePanel";
import { IVariablesState } from "../../reducers/Variables";
import { IVariableItem } from "../../models/Variables";
import MTMList, { PartialColumn } from "../Presentational/MTMList";
import { getVariablesList } from "../../service/Api";

const columns: PartialColumn[] = [
  {
    name: "Name",
    fieldName: "name"
  },
  {
    name: "Type",
    fieldName: "type"
  },
  {
    name: "Body",
    fieldName: "body"
  }
];

const mapStateToProps = (state: IState) => state.variables;

interface IVariableProps extends IVariablesState {}

const Variables: React.FC<IVariableProps> = (props: IVariableProps) => {
  const [items, setItems] = useState([] as IVariableItem[]);

  const fetchItems = () => {
    getVariablesList().then(setItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <MTMList items={items} columns={columns} />
      {props.isPanelOpen && <VariablePanel {...props.selectedItem} />}
    </>
  );
};

export default {
  name: "Variables",
  component: connect(mapStateToProps)(Variables),
  icon: "Variable",
  key: Routes.Variables
} as IRouteComponent;
