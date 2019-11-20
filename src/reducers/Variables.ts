import { IAnyAction } from "../models/AppModel";

export const VariablesInitialState = {
  selectedItem: null
};

export type VariablesState = typeof VariablesInitialState;

export function VariablesReducer(
  state: VariablesState = VariablesInitialState,
  action: IAnyAction
) {
  switch (action.type) {
    case "onItemSelection":
      return {
        ...state,
        selectedItem: action.payload
      };
    default:
      return state;
  }
}
