import { IWithId } from './App';

export interface ITriggerItem extends IWithId {
  name: string;
  type: string;
  body: string;
}

export class TriggerItem implements ITriggerItem {
  name = '';
  type = '';
  body = '';
  id = -1;

  constructor(obj: Partial<ITriggerItem> = {}) {
    Object.assign<ITriggerItem, Partial<ITriggerItem>>(this, obj);
  }
}
