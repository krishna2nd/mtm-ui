import { IDropdownOption } from 'office-ui-fabric-react';

import { IWithId } from './App';

export interface IVariableItem extends IWithId {
  body: string;
  name: string;
  type: string;
}

export class VariableItem implements IVariableItem {
  body = '';
  name = '';
  type = '';
  id = -1;

  constructor(obj: Partial<IVariableItem> = {}) {
    Object.assign<IVariableItem, Partial<IVariableItem>>(this, obj);
  }
}

export const VariableTypes: IDropdownOption[] = [
  { key: 'function', text: 'FUNCTION' },
  { key: 'custom', text: 'CUSTOM' },
  { key: 'data_layer', text: 'DATA_LAYER' },
  { key: 'cookie', text: 'COOKIE' }
];
