export interface IBase<T> {
  selectedItem: T;
  panelData: T;
  isPanelOpen: boolean;
  isDeleteConfirmationDialogVisible: boolean;
}

export interface IService<T> {
  getList(): Promise<T[]>;
  deleteItem(id: number): Promise<Response>;
  saveItem(item: T): Promise<Response>;
}
