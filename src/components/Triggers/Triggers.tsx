import RouteMain from 'components/Common/RouteMain';
import { PartialColumn } from 'components/Presentational/MTMList';
import { IRouteComponent, Routes, Status } from 'models/App';
import { ITriggerItem } from 'models/Triggers';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { IState } from 'reducers/Root';
import { ITriggersState } from 'reducers/Triggers';
import { TriggersApi } from 'service/Api';

import TriggerPanel from './TriggerPanel';

const columns: PartialColumn[] = [
  {
    name: 'Name',
    fieldName: 'name'
  },
  {
    name: 'Event Type',
    fieldName: 'type'
  },
  {
    name: 'Body',
    fieldName: 'body'
  }
];

const mapStateToProps = (state: IState) => state.triggers;

const Triggers: FC<ITriggersState> = (triggersState: ITriggersState) => {
  return (
    <RouteMain
      renderPanel={renderPanel}
      apiService={TriggersApi}
      state={triggersState}
      columns={columns}
    />
  );
};

const renderPanel = (
  panelData: ITriggerItem,
  saveItem: (item: ITriggerItem) => void,
  saveStatus: Status
) => (
  <TriggerPanel {...panelData} saveItem={saveItem} saveStatus={saveStatus} />
);

export default {
  name: 'Triggers',
  component: connect(mapStateToProps)(Triggers),
  icon: 'TriggerAuto',
  key: Routes.Triggers
} as IRouteComponent;
