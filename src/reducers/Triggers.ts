import { IMTMAction } from "../models/App";
import { ITriggerItem, TriggerItem } from "../models/Triggers";
import { IBase } from "../models/Common";
import { getCommonReducer } from "./Common";

export interface ITriggersState extends IBase<ITriggerItem> {}

export const TriggersInitialState: ITriggersState = {
  selectedItem: new TriggerItem(),
  panelData: new TriggerItem(),
  isPanelOpen: false,
};

export const TriggersReducer = (
  state = TriggersInitialState,
  action: IMTMAction
): ITriggersState =>
  getCommonReducer<ITriggerItem, ITriggersState>(TriggerItem)(state, action);
