export interface ITagItem {
  name: string;
  body: string;
  triggers: string[];
  id?: number;
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
