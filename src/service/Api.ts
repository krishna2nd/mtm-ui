import * as Endpoints from "../constants/Endpoints";
import { ITagItem, TagItem } from "../models/Tags";
import { IVariableItem, VariableItem } from "../models/Variables";
import { TriggerItem, ITriggerItem } from "../models/Triggers";
import { IWithId } from "../models/App";

const headers = {
  "Content-Type": "application/json"
};

const getList = <T>(url: string, C: new (item: T) => T) =>
  fetch(url, { method: "GET" })
    .then(response => response.json())
    .then(response => (response as T[]).map((item: T) => new C(item)));

const deleteItem = (url: string) =>
  fetch(url, {
    method: "DELETE",
    headers
  });

const createItem = <T extends IWithId>(url: string, item: T) => {
  delete item.id;
  return fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(item)
  });
};

const updateItem = <T>(url: string, item: T) =>
  fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(item)
  });

/* Tags */
export const getTagsList = () => getList<ITagItem>(Endpoints.Tags, TagItem);

export const deleteTagItem = (id: number) =>
  deleteItem(Endpoints.TagsWithId(id));

export const saveTagItem = (tagItem: ITagItem) => {
  if (tagItem.id === -1) {
    return createItem<ITagItem>(Endpoints.Tags, tagItem);
  }
  return updateItem<ITagItem>(Endpoints.TagsWithId(tagItem.id), tagItem);
};

/* Triggers */
export const getTriggersList = () =>
  getList<ITriggerItem>(Endpoints.Triggers, TriggerItem);

export const deleteTriggersItem = (id: number) =>
  deleteItem(Endpoints.TriggersWithId(id));

export const saveTriggerItem = (triggerItem: ITriggerItem) => {
  if (triggerItem.id === -1) {
    return createItem<ITriggerItem>(Endpoints.Triggers, triggerItem);
  }
  return updateItem<ITriggerItem>(
    Endpoints.TriggersWithId(triggerItem.id),
    triggerItem
  );
};

/* Variables */
export const getVariablesList = () =>
  getList<IVariableItem>(Endpoints.Variables, VariableItem);

export const deleteVariablesItem = (id: number) =>
  deleteItem(Endpoints.VariablesWithId(id));

export const saveVariablesItem = (variablesItem: ITriggerItem) => {
  if (variablesItem.id === -1) {
    return createItem<IVariableItem>(Endpoints.Variables, variablesItem);
  }
  return updateItem<IVariableItem>(
    Endpoints.VariablesWithId(variablesItem.id),
    variablesItem
  );
};
