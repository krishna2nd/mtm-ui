import RouteMain from 'components/Common/RouteMain';
import { PartialColumn } from 'components/Presentational/MTMList';
import { IRouteComponent, Routes, Status } from 'models/App';
import { IVariableItem, VariableTypes } from 'models/Variables';
import { IDropdownOption } from 'office-ui-fabric-react';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { IState } from 'reducers/Root';
import { IVariablesState } from 'reducers/Variables';
import { VariablesApi } from 'service/Api';

import VariablePanel from './VariablePanel';

const columns: PartialColumn[] = [
  {
    name: 'Name',
    fieldName: 'name'
  },
  {
    name: 'Type',
    onRender: (item: IVariableItem) =>
      (
        VariableTypes.find(
          (option: IDropdownOption) => option.key === item.type
        ) || { text: '-' }
      ).text
  },
  {
    name: 'Body',
    fieldName: 'body'
  }
];

const mapStateToProps = (state: IState) => state.variables;

const Variables: FC<IVariablesState> = (variablesState: IVariablesState) => {
  return (
    <RouteMain
      renderPanel={renderPanel}
      apiService={VariablesApi}
      state={variablesState}
      columns={columns}
    />
  );
};

const renderPanel = (
  panelData: IVariableItem,
  saveItem: (item: IVariableItem) => void,
  saveStatus: Status
) => (
  <VariablePanel {...panelData} saveItem={saveItem} saveStatus={saveStatus} />
);

export default {
  name: 'Variables',
  component: connect(mapStateToProps)(Variables),
  icon: 'Variable',
  key: Routes.Variables
} as IRouteComponent;
