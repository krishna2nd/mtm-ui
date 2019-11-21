import { IMTMAction } from "../models/App";
import { TriggerItem } from "../models/Triggers";

export const TriggersInitialState = {
  selectedItem: new TriggerItem(),
  panelData: new TriggerItem(),
  isTriggerPanelOpen: false
};

export type TriggersState = typeof TriggersInitialState;

export function TriggersReducer(
  state = TriggersInitialState,
  action: IMTMAction
) {
  switch (action.type) {
    case "onTriggerItemSelection":
      return {
        ...state,
        selectedItem: new TriggerItem(action.payload)
      };
    case "onAddClick":
      return {
        ...state,
        panelData: new TriggerItem(),
        isTriggerPanelOpen: true
      };
    case "onEditClick":
      return {
        ...state,
        panelData: new TriggerItem(state.selectedItem),
        isTagPanelOpen: true
      };
    case "onCancelClick":
      return {
        ...state,
        isTriggerPanelOpen: false
      };
    default:
      return state;
  }
}
