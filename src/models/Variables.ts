export interface IVariableItem {
  body: string;
  name: string;
  type: string;
  id: number;
}

export class VariableItem implements IVariableItem {
  body = "0";
  name = "";
  type = "";
  id = -1;

  constructor(obj = {}) {
    Object.assign(this, obj);
  }
}
