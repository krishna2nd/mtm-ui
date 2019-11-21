import React, { useState, useEffect } from "react";
import { Routes, IRouteComponent } from "../../models/App";
import { connect } from "react-redux";
import { IState } from "../../reducers/Root";
import VariablePanel from "./VariablePanel";
import { IVariablesState } from "../../reducers/Variables";
import { IVariableItem } from "../../models/Variables";
import MTMList, { PartialColumn } from "../Presentational/MTMList";
import { getVariablesList, deleteVariablesItem } from "../../service/Api";
import { Dispatch } from "redux";
import MTMDialog from "../Presentational/MTMDialog";

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDeleteDialogDismiss: () => dispatch({ type: "onDeleteDialogDismiss" })
});

interface IVariableProps
  extends IVariablesState,
    ReturnType<typeof mapDispatchToProps> {}

const Variables: React.FC<IVariableProps> = (props: IVariableProps) => {
  const [items, setItems] = useState([] as IVariableItem[]);

  const fetchItems = () => {
    getVariablesList().then(setItems);
  };

  const deleteItem = () => {
    deleteVariablesItem(props.selectedItem.id).then(fetchItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <MTMList items={items} columns={columns} />
      {props.isPanelOpen && (
        <VariablePanel {...props.selectedItem} refreshItems={fetchItems} />
      )}
      <MTMDialog
        onConfirm={() => {
          deleteItem();
          props.onDeleteDialogDismiss();
        }}
        onCancel={props.onDeleteDialogDismiss}
        isVisible={props.isDeleteConfirmationDialogVisible}
      />
    </>
  );
};

export default {
  name: "Variables",
  component: connect(mapStateToProps, mapDispatchToProps)(Variables),
  icon: "Variable",
  key: Routes.Variables
} as IRouteComponent;
