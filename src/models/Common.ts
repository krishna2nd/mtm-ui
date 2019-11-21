export interface IBase<T> {
  selectedItem: T;
  panelData: T;
  isPanelOpen: boolean;
  isDeleteConfirmationDialogVisible: boolean;
}
