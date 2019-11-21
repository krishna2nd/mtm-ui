import React, { useState, useEffect } from "react";
import { IRouteComponent, Routes } from "../../models/App";
import { connect } from "react-redux";
import { IState } from "../../reducers/Root";
import TriggerPanel from "./TriggerPanel";
import { ITriggersState } from "../../reducers/Triggers";
import { ITriggerItem } from "../../models/Triggers";
import MTMList, { PartialColumn } from "../Presentational/MTMList";
import { getTriggersList, deleteTriggersItem } from "../../service/Api";
import MTMDialog from "../Presentational/MTMDialog";
import { Dispatch } from "redux";

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDeleteDialogDismiss: () => dispatch({ type: "onDeleteDialogDismiss" })
});

interface ITriggerProps
  extends ITriggersState,
    ReturnType<typeof mapDispatchToProps> {}

const Triggers: React.FC<ITriggerProps> = (props: ITriggerProps) => {
  const [items, setItems] = useState([] as ITriggerItem[]);

  const fetchItems = () => {
    getTriggersList().then(setItems);
  };

  const deleteItem = () => {
    deleteTriggersItem(props.selectedItem.id).then(fetchItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <MTMList items={items} columns={columns} />
      {props.isPanelOpen && (
        <TriggerPanel {...props.selectedItem} refreshItems={fetchItems} />
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
  name: "Triggers",
  component: connect(mapStateToProps, mapDispatchToProps)(Triggers),
  icon: "TriggerAuto",
  key: Routes.Triggers
} as IRouteComponent;
