import { IWithId } from "./App";

export interface ITagItem extends IWithId {
  name: string;
  body: string;
  triggers: number[];
}

export class TagItem implements ITagItem {
  name = "";
  body = "";
  triggers = [];
  id = -1;

  constructor(obj = {}) {
    Object.assign(this, obj);
  }
}
