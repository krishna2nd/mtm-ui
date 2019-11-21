export interface ITriggerItem {
  name: string;
  eventType: string;
  id: number;
}

export class TriggerItem implements ITriggerItem {
  name = "";
  eventType = "";
  id = -1;

  constructor(obj = {}) {
    Object.assign(this, obj);
  }
}
