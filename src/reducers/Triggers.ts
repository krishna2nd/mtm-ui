import { IAnyAction } from "../models/AppModel";

export const TriggersInitialState = {
  selectedItem: null
};

export type TriggersState = typeof TriggersInitialState;

export function TriggersReducer(
  state: TriggersState = TriggersInitialState,
  action: IAnyAction
) {
  switch (action.type) {
    case "onTriggerItemSelection":
      return {
        ...state,
        selectedItem: action.payload
      };
    default:
      return state;
  }
}
