import { IMTMAction } from '../models/App';
import { IBase } from '../models/Common';
import { IVariableItem, VariableItem } from '../models/Variables';

import { getCommonReducer } from './Common';

export interface IVariablesState extends IBase<IVariableItem> {}

const VariablesInitialState: IVariablesState = {
  selectedItem: new VariableItem(),
  panelData: new VariableItem(),
  isPanelOpen: false,
  isDeleteConfirmationDialogVisible: false
};

export const VariablesReducer = (
  state = VariablesInitialState,
  action: IMTMAction
): IVariablesState =>
  getCommonReducer<IVariableItem, IVariablesState>(VariableItem)(state, action);
