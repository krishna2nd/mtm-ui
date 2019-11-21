import { IMTMAction } from 'models/App';
import { IBase } from 'models/Common';

const emptyReducer = <S>(state: S, _: IMTMAction): S => state;

export const getCommonReducer = <T, S extends IBase<T>>(
  C: new (item?: Partial<T>) => T,
  additionalReducer = emptyReducer
) => {
  return (state: S, action: IMTMAction) => {
    switch (action.type) {
      case 'onItemSelection':
        return {
          ...state,
          selectedItem: new C(action.payload)
        };
      case 'onRouteChange':
      case 'onResetItemSelection':
        return {
          ...state,
          selectedItem: new C()
        };
      case 'onAddClick':
        return {
          ...state,
          panelData: new C(),
          isPanelOpen: true
        };
      case 'onEditClick':
        return {
          ...state,
          panelData: new C(state.selectedItem),
          isPanelOpen: true
        };
      case 'onPanelDismiss':
        return {
          ...state,
          isPanelOpen: false
        };
      case 'onDeleteClick':
        return {
          ...state,
          isDeleteConfirmationDialogVisible: true
        };
      case 'onDeleteDialogDismiss':
        return {
          ...state,
          isDeleteConfirmationDialogVisible: false
        };
      default:
        return additionalReducer(state, action);
    }
  };
};
