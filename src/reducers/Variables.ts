import { IAnyAction } from "../models/AppModel";

export const VariablesInitialState = {
  selectedItem: null
};

export type VariablesState = typeof VariablesInitialState;

export function VariablesReducer(
  state: VariablesState = VariablesInitialState,
  action: IAnyAction
) {
  debugger;
  switch (action.type) {
    case "onVariableItemSelection":
      return {
        ...state,
        selectedItem: action.payload
      };
    default:
      return state;
  }
}
