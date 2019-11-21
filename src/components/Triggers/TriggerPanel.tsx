import MTMPanel from 'components/Presentational/MTMPanel';
import MTMTextField from 'components/Presentational/MTMTextField';
import { Status } from 'models/App';
import { ITriggerItem } from 'models/Triggers';
import React, { FC, useState } from 'react';

interface ITriggerPanelProps extends ITriggerItem {
  saveItem(item: ITriggerItem): void;
  saveStatus: Status;
}

const TriggerPanel: FC<ITriggerPanelProps> = (props: ITriggerPanelProps) => {
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.type);
  const [body, setBody] = useState(props.body);
<<<<<<< HEAD

  const [saveStatus, setSaveStatus] = useState(Status.NotYetStarted);
=======
>>>>>>> a0b529b... Added tslint.

  const onSaveClick = () => {
    const triggerItem = { name, type, body, id: props.id };
    props.saveItem(triggerItem);
  };

  const content = (
    <>
      <MTMTextField
        label={'Name'}
        maxLength={50}
        value={name}
        onValueChange={setName}
        required
      />
      <MTMTextField
        label={'Event Type'}
        maxLength={50}
        value={type}
        onValueChange={setType}
        required
      />
      <MTMTextField
<<<<<<< HEAD
        label={"Body"}
        value={body}
        onValueChange={setBody}
        multiline
        rows={4}
=======
        label={'Body'}
        value={props.body}
        onValueChange={setBody}
        rows={4}
        multiline
>>>>>>> a0b529b... Added tslint.
      />
    </>
  );

  return (
    <MTMPanel
      headerText={props.id === -1 ? 'Add Trigger' : 'Edit Trigger'}
      onSaveClick={onSaveClick}
      content={content}
      isActionInProgress={props.saveStatus === Status.Loading}
      isFormValid={Boolean(name) && Boolean(type)}
    />
  );
};

export default TriggerPanel;
