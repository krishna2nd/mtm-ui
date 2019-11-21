import { IMTMAction } from "../models/App";
import { TagItem, ITagItem } from "../models/Tags";
import { getCommonReducer } from "./Common";
import { IBase } from "../models/Common";

export interface ITagsState extends IBase<ITagItem> {}

export const TagsInitialState: ITagsState = {
  selectedItem: new TagItem(),
  panelData: new TagItem(),
  isPanelOpen: false
};

export const TagsReducer = (
  state = TagsInitialState,
  action: IMTMAction
): ITagsState => getCommonReducer<ITagItem, ITagsState>(TagItem)(state, action);
