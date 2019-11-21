import { IMTMAction } from "../models/App";
import { VariableItem } from "../models/Variables";

export const VariablesInitialState = {
  selectedItem: new VariableItem(),
  panelData: new VariableItem(),
  isVariablePanelOpen: false
};

export type VariablesState = typeof VariablesInitialState;

export function VariablesReducer(
  state = VariablesInitialState,
  action: IMTMAction
) {
  switch (action.type) {
    case "onVariableItemSelection":
      return {
        ...state,
        selectedItem: action.payload
      };
    case "onAddClick":
      return {
        ...state,
        panelData: new VariableItem(),
        isVariablePanelOpen: true
      };
    case "onEditClick":
      return {
        ...state,
        panelData: new VariableItem(state.selectedItem),
        isVariablePanelOpen: true
      };
    case "onCancelClick":
      return {
        ...state,
        isVariablePanelOpen: false
      };
    default:
      return state;
  }
}
