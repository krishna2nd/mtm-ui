import { IMTMAction } from "../models/App";

export const InitialState = {
  isAddPanelVisible: false,
  isEditPanelVisible: false,
  isDeleteConfirmationDialogVisible: false,
  hasSelectedItem: false
};

export type MainState = typeof InitialState;

export const MainReducer = (
  state = InitialState,
  action: IMTMAction
): MainState => {
  switch (action.type) {
    case "onAddClick":
      return {
        ...state,
        isAddPanelVisible: true
      };
    case "onEditClick":
      return {
        ...state,
        isEditPanelVisible: true
      };

    case "onItemSelection":
      return {
        ...state,
        hasSelectedItem: true
      };
    case "onRouteChange":
    case "onResetItemSelection":
      return {
        ...state,
        hasSelectedItem: false
      };
    default:
      return state;
  }
};
