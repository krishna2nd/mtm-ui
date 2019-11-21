import { combineReducers, createStore } from "redux";
import { MainReducer, MainState } from "./Main";
import { TagsReducer, ITagsState } from "./Tags";
import { TriggersReducer, ITriggersState } from "./Triggers";
import { VariablesReducer, IVariablesState } from "./Variables";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
}

export interface IState {
  main: MainState;
  tags: ITagsState;
  triggers: ITriggersState;
  variables: IVariablesState;
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
