import { IMTMAction } from "../models/App";

export const InitialState = {
  isAddPanelVisible: false,
  isEditPanelVisible: false,
  isDeleteConfirmationDialogVisible: false
};

export type MainState = typeof InitialState;

export function MainReducer(state = InitialState, action: IMTMAction) {
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
    case "onDeleteClick":
      return {
        ...state,
        isDeleteConfirmationDialogVisible: true
      };
    default:
      return InitialState;
  }
}
