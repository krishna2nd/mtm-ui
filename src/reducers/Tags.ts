import { IAnyAction } from "../models/AppModel";

export const TagsInitialState = {
  selectedItem: null
};

export type TagsState = typeof TagsInitialState;

export function TagsReducer(
  state: TagsState = TagsInitialState,
  action: IAnyAction
) {
  switch (action.type) {
    case "onTagItemSelection":
      return {
        ...state,
        selectedItem: action.payload
      };
    default:
      return state;
  }
}
