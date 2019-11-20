import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Selection
} from "office-ui-fabric-react/lib/DetailsList";
import { Routes, IRouteComponent } from "../models/AppModel";
import { connect } from "react-redux";
import { IState } from "../reducers/Root";

const mapStateToProps = (state: IState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setSelectedItem: (item: any) =>
    dispatch({ type: "onVariableItemSelection", payload: item })
});
export interface IVariableItem {
  key: number;
  name: string;
  type: string;
}

interface IVariableProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const Variables: React.FC<IVariableProps> = (props: IVariableProps) => {
  const columns = [
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
    }
  ];
  const onSelectionChanged = () => {
    debugger;
    const selectedItem = selection.getSelection()[0];
    props.setSelectedItem(selectedItem);
  };

  const selection = new Selection({
    onSelectionChanged: onSelectionChanged
  });

  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push({
      key: i,
      type: "type " + i,
      name: "Name " + i
    });
  }

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
const ConnectedVariables = connect(
  mapStateToProps,
  mapDispatchToProps
)(Variables);
export default {
  name: "Variables",
  component: ConnectedVariables,
  icon: "Variable",
  key: Routes.Variables
} as IRouteComponent;
