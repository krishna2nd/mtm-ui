import MTMDialog from 'components/Presentational/MTMDialog';
import MTMList, { PartialColumn } from 'components/Presentational/MTMList';
import { IWithId, Status } from 'models/App';
import { IBase, IService } from 'models/Common';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDeleteDialogDismiss: () => dispatch({ type: 'onDeleteDialogDismiss' }),
  onPanelDismiss: () => dispatch({ type: 'onPanelDismiss' })
});

interface IRouteMainProps<T> extends ReturnType<typeof mapDispatchToProps> {
  columns: PartialColumn[];
  state: IBase<T>;
  apiService: IService<T>;
  renderPanel(
    panelData: T,
    saveItem: (item: T) => void,
    saveStatus: Status
  ): JSX.Element;
}

function RouteMain<T extends IWithId>(props: IRouteMainProps<T>) {
  const {
    apiService,
    columns,
    onDeleteDialogDismiss,
    onPanelDismiss,
    renderPanel,
    state
  } = props;
  const [items, setItems] = useState([] as T[]);
  const [saveStatus, setSaveStatus] = useState(Status.NotYetStarted);

  const fetchItems = () => {
    apiService.getList().then(setItems);
  };

  const deleteItem = () => {
    apiService.deleteItem(state.selectedItem.id).then(fetchItems);
  };

  const saveItem = (item: T) => {
    setSaveStatus(Status.Loading);
    apiService
      .saveItem(item)
      .then(() => setSaveStatus(Status.Completed))
      .then(fetchItems)
      .catch(() => setSaveStatus(Status.Failed))
      .finally(onPanelDismiss);
  };

  const onDeleteConfirmation = () => {
    deleteItem();
    onDeleteDialogDismiss();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <MTMList items={items} columns={columns} />
      {state.isPanelOpen && renderPanel(state.panelData, saveItem, saveStatus)}
      <MTMDialog
        onConfirm={onDeleteConfirmation}
        onCancel={onDeleteDialogDismiss}
        isVisible={state.isDeleteConfirmationDialogVisible}
      />
    </>
  );
}

export default connect(null, mapDispatchToProps)(RouteMain);
