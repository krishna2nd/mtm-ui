import { IMTMAction } from 'models/App';
import { IBase } from 'models/Common';
import { ITriggerItem, TriggerItem } from 'models/Triggers';

import { getCommonReducer } from './Common';

export interface ITriggersState extends IBase<ITriggerItem> {}

const TriggersInitialState: ITriggersState = {
  selectedItem: new TriggerItem(),
  panelData: new TriggerItem(),
  isPanelOpen: false,
  isDeleteConfirmationDialogVisible: false
};

export const TriggersReducer = (
  state = TriggersInitialState,
  action: IMTMAction
): ITriggersState =>
  getCommonReducer<ITriggerItem, ITriggersState>(TriggerItem)(state, action);
