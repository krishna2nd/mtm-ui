import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
  Selection,
  memoizeFunction
} from "office-ui-fabric-react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedItem: (item: any) =>
    dispatch({ type: "onItemSelection", payload: item }),
  resetSelectedItems: () => dispatch({ type: "onResetItemSelection" })
});

export type PartialColumn = Pick<
  IColumn,
  "name" | "fieldName" | "onRender" | "isMultiline"
> & {
  minColumnWidth?: number;
};
interface IMTMListProps<T> extends ReturnType<typeof mapDispatchToProps> {
  items: T[];
  columns: PartialColumn[];
}

function MTMList<T>(props: IMTMListProps<T>) {
  const selection = new Selection({
    onSelectionChanged: () => {
      const selectedItem = selection.getSelection()[0];
      if (selectedItem) {
        props.setSelectedItem(selectedItem as T);
      } else {
        props.resetSelectedItems();
      }
    }
  });

  return (
    <DetailsList
      items={props.items}
      className={"table-border"}
      columns={getColumns(props.columns)}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      selectionPreservedOnEmptyClick
      selectionMode={SelectionMode.single}
      selection={selection}
    />
  );
}

const getColumns = memoizeFunction(
  (partialColumns: PartialColumn[]): IColumn[] =>
    partialColumns.map((partialColumn: PartialColumn, index: number) => ({
      key: index.toString(),
      maxWidth: 300,
      minWidth: partialColumn.minColumnWidth || 300,
      isResizable: true,
      ...partialColumn
    }))
);

export default connect(null, mapDispatchToProps)(MTMList);
