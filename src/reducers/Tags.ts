import { IMTMAction } from 'models/App';
import { IBase } from 'models/Common';
import { ITagItem, TagItem } from 'models/Tags';

import { getCommonReducer } from './Common';

export interface ITagsState extends IBase<ITagItem> {}

const TagsInitialState: ITagsState = {
  selectedItem: new TagItem(),
  panelData: new TagItem(),
  isPanelOpen: false,
  isDeleteConfirmationDialogVisible: false
};

export const TagsReducer = (
  state = TagsInitialState,
  action: IMTMAction
): ITagsState => getCommonReducer<ITagItem, ITagsState>(TagItem)(state, action);
