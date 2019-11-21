import { IWithId } from "./App";

export interface IVariableItem extends IWithId {
  body: string;
  name: string;
  type: string;
}

export class VariableItem implements IVariableItem {
  body = "";
  name = "";
  type = "";
  id = -1;

  constructor(obj = {}) {
    Object.assign(this, obj);
  }
}
