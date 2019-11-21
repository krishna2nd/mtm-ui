import { IMTMAction } from "../models/App";
import { TagItem } from "../models/Tags";

export const TagsInitialState = {
  selectedItem: new TagItem(),
  panelData: new TagItem(),
  isTagPanelOpen: false
};

export type TagsState = typeof TagsInitialState;

export function TagsReducer(state = TagsInitialState, action: IMTMAction) {
  switch (action.type) {
    case "onTagItemSelection":
      return {
        ...state,
        selectedItem: new TagItem(action.payload)
      };
    case "onAddClick":
      return {
        ...state,
        panelData: new TagItem(),
        isTagPanelOpen: true
      };
    case "onEditClick":
      return {
        ...state,
        panelData: new TagItem(state.selectedItem),
        isTagPanelOpen: true
      };
    case "onCancelClick":
      return {
        ...state,
        isTagPanelOpen: false
      };
    default:
      return state;
  }
}
