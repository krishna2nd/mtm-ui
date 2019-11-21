import {
  ColumnActionsMode,
  DefaultPalette,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  memoizeFunction,
  mergeStyles,
  Selection,
  SelectionMode
} from 'office-ui-fabric-react';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  /* tslint:disable-next-line:no-any */
  setSelectedItem: (item: any) =>
    dispatch({ type: 'onItemSelection', payload: item }),
  resetSelectedItems: () => dispatch({ type: 'onResetItemSelection' })
});

export type PartialColumn = Pick<
  IColumn,
  'name' | 'fieldName' | 'onRender' | 'isMultiline'
> & {
  maxColumnWidth?: number;
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
      className={mergeStyles({
        border: '0px solid',
        borderColor: DefaultPalette.neutralQuaternaryAlt
      })}
      columns={getColumns(props.columns)}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      selectionPreservedOnEmptyClick={true}
      selectionMode={SelectionMode.single}
      selection={selection}
    />
  );
}

const getColumns = memoizeFunction(
  (partialColumns: PartialColumn[]): IColumn[] =>
    partialColumns.map((partialColumn: PartialColumn, index: number) => ({
      key: index.toString(),
      maxWidth: partialColumn.maxColumnWidth || 300,
      columnActionsMode: ColumnActionsMode.disabled,
      minWidth: 200,
      isResizable: true,
      ...partialColumn
    }))
);

export default connect(null, mapDispatchToProps)(MTMList);
