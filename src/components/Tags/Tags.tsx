import RouteMain from 'components/Common/RouteMain';
import { PartialColumn } from 'components/Presentational/MTMList';
import { IRouteComponent, Routes, Status } from 'models/App';
import { ITagItem } from 'models/Tags';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { IState } from 'reducers/Root';
import { ITagsState } from 'reducers/Tags';
import { TagsApi } from 'service/Api';

import TagPanel from './TagPanel';

const columns: PartialColumn[] = [
  {
    name: 'Name',
    fieldName: 'name'
  },
  {
    name: 'Firing Triggers',
    onRender: (item: ITagItem) => item.triggers.join(', ')
  },
  {
    name: 'Body',
    fieldName: 'body',
    isMultiline: true,
    maxColumnWidth: 800
  }
];

const mapStateToProps = (state: IState) => state.tags;

const Tags: FC<ITagsState> = (tagsState: ITagsState) => {
  return (
    <RouteMain
      renderPanel={renderPanel}
      apiService={TagsApi}
      state={tagsState}
      columns={columns}
    />
  );
};

const renderPanel = (
  panelData: ITagItem,
  saveItem: (item: ITagItem) => void,
  saveStatus: Status
) => <TagPanel {...panelData} saveItem={saveItem} saveStatus={saveStatus} />;

export default {
  name: 'Tags',
  component: connect(mapStateToProps)(Tags),
  icon: 'Tag',
  key: Routes.Tags
} as IRouteComponent;
