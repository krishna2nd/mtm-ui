import { combineReducers, createStore } from "redux";
import { MainReducer, MainState } from "./Main";
import { TagsReducer, TagsState } from "./Tags";
import { TriggersReducer, TriggersState } from "./Triggers";
import { VariablesReducer, VariablesState } from "./Variables";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
}

export interface IState {
  main: MainState;
  tags: TagsState;
  triggers: TriggersState;
  variables: VariablesState;
}

export default createStore<IState, any, any, any>(
  combineReducers<IState>({
    main: MainReducer,
    tags: TagsReducer,
    triggers: TriggersReducer,
    variables: VariablesReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ name: "MTM" })
);
