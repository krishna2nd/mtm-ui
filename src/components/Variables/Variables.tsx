import React, { useState, useEffect } from "react";
import { Routes, IRouteComponent } from "../../models/App";
import { connect } from "react-redux";
import { IState } from "../../reducers/Root";
import VariablePanel from "./VariablePanel";
import { VariablesState } from "../../reducers/Variables";
import { VariableItem, IVariableItem } from "../../models/Variables";
import MTMList, { PartialColumn } from "../Presentational/MTMList";

const mapStateToProps = (state: IState) => state.variables;

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

interface IVariableProps extends VariablesState {}

const Variables: React.FC<IVariableProps> = (props: IVariableProps) => {
  const [items, setItems] = useState([] as IVariableItem[]);

  useEffect(() => {
    fetch("https://ms-tagmanager.azurewebsites.net/variables")
      .then(res => res.json())
      .then(
        response =>
          setItems(response.map((item: object) => new VariableItem(item))),
        error => console.error(error)
      );
  }, []);

  return (
    <>
      <MTMList items={items} columns={columns} />
      {props.isVariablePanelOpen && <VariablePanel {...props.selectedItem} />}
    </>
  );
};

export default {
  name: "Variables",
  component: connect(mapStateToProps)(Variables),
  icon: "Variable",
  key: Routes.Variables
} as IRouteComponent;
