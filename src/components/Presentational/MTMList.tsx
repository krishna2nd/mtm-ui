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
    dispatch({ type: "onTagItemSelection", payload: item })
});

export type PartialColumn = Pick<
  IColumn,
  "name" | "fieldName" | "onRender" | "isMultiline"
>;
interface IMTMListProps<T> extends ReturnType<typeof mapDispatchToProps> {
  items: T[];
  columns: PartialColumn[];
}

function MTMList<T>(props: IMTMListProps<T>) {
  const onSelectionChanged = () => {
    const selectedItem = selection.getSelection()[0];
    props.setSelectedItem(selectedItem as T);
  };

  const selection = new Selection({
    onSelectionChanged: onSelectionChanged
  });

  return (
    <DetailsList
      items={props.items}
      className={"table-border"}
      columns={getColumns(props.columns)}
      layoutMode={DetailsListLayoutMode.justified}
      selectionPreservedOnEmptyClick
      selectionMode={SelectionMode.single}
      selection={selection}
    />
  );
}

const getColumns = memoizeFunction(
  (partialColumns: PartialColumn[]): IColumn[] =>
    partialColumns.map(
      (partialColumn: PartialColumn, index: number) =>
        ({
          key: index.toString(),
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
          ...partialColumn
        } as IColumn)
    )
);

export default connect(null, mapDispatchToProps)(MTMList);
