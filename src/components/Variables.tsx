import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { IRouteComponent, Routes } from "../models/AppModel";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

export interface IVariableComponentItem {
  key: number;
  name: string;
  value: number;
}

export interface IVariableComponentState {
  items: IVariableComponentItem[];
  selectionDetails: {};
}

class Variables extends React.Component<{}, IVariableComponentState> {
  private _selection: Selection;
  private _allItems: IVariableComponentItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () =>
        this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    // Populate with items for demos.
    this._allItems = [];
    for (let i = 0; i < 200; i++) {
      this._allItems.push({
        key: i,
        name: "Item " + i,
        value: i
      });
    }

    this._columns = [
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
        name: "Value",
        fieldName: "value",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      }
    ];

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails()
    };
  }

  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <>
        <div className={exampleChildClass}>{selectionDetails}</div>
        <TextField
          className={exampleChildClass}
          label="Filter by name:"
          onChange={this._onFilter}
          styles={{ root: { maxWidth: "300px" } }}
        />
        <DetailsList
          items={items}
          columns={this._columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selection={this._selection}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="Row checkbox"
          onItemInvoked={this._onItemInvoked}
        />
      </>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return (
          "1 item selected: " +
          (this._selection.getSelection()[0] as IVariableComponentItem).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1)
        : this._allItems
    });
  };

  private _onItemInvoked = (item: IVariableComponentItem): void => {
    alert(`Item invoked: ${item.name}`);
  };
}

export default {
  name: "Variables",
  component: Variables,
  icon: "Variable",
  key: Routes.Variables
} as IRouteComponent;
