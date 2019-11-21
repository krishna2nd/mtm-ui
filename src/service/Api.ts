import * as Endpoints from 'constants/Endpoints';
import { IWithId } from 'models/App';
import { IService } from 'models/Common';
import { ITagItem, TagItem } from 'models/Tags';
import { ITriggerItem, TriggerItem } from 'models/Triggers';
import { IVariableItem, VariableItem } from 'models/Variables';

const headers = {
  'Content-Type': 'application/json'
};

const getList = <T>(url: string, C: new (item: T) => T) =>
  fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(response => (response as T[]).map((item: T) => new C(item)));

const deleteItem = (url: string) =>
  fetch(url, {
    method: 'DELETE',
    headers
  });

const createItem = <T extends IWithId>(url: string, item: T) => {
  delete item.id;
  return fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(item)
  });
};

const updateItem = <T>(url: string, item: T) =>
  fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(item)
  });

const getServiceApi = <T extends IWithId>(
  listEndpoint: string,
  detailsEndpoint: (id: number) => string,
  C: new () => T
): IService<T> => ({
  getList: () => getList<T>(listEndpoint, C),
  deleteItem: (id: number) => deleteItem(detailsEndpoint(id)),
  saveItem: (item: T) => {
    if (item.id === -1) {
      return createItem<T>(listEndpoint, item);
    }
    return updateItem<T>(detailsEndpoint(item.id), item);
  }
});

export const TagsApi = getServiceApi<ITagItem>(
  Endpoints.Tags,
  Endpoints.TagsWithId,
  TagItem
);

export const TriggersApi = getServiceApi<ITriggerItem>(
  Endpoints.Triggers,
  Endpoints.TriggersWithId,
  TriggerItem
);

export const VariablesApi = getServiceApi<IVariableItem>(
  Endpoints.Variables,
  Endpoints.VariablesWithId,
  VariableItem
);
