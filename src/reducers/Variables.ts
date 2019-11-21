import { IMTMAction } from "../models/App";
import { IVariableItem, VariableItem } from "../models/Variables";
import { IBase } from "../models/Common";
import { getCommonReducer } from "./Common";

export interface IVariablesState extends IBase<IVariableItem> {}

export const VariablesInitialState: IVariablesState = {
  selectedItem: new VariableItem(),
  panelData: new VariableItem(),
  isPanelOpen: false
};

export const VariablesReducer = (
  state = VariablesInitialState,
  action: IMTMAction
): IVariablesState =>
  getCommonReducer<IVariableItem, IVariablesState>(VariableItem)(state, action);
