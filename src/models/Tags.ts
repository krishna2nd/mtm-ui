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

  constructor(obj: Partial<ITagItem> = {}) {
    Object.assign<ITagItem, Partial<ITagItem>>(this, obj);
  }
}
