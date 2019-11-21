export interface IVariableItem {
  body: string;
  name: string;
  type: string;
  id: number;
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
