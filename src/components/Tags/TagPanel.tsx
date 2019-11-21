import MTMPanel from 'components/Presentational/MTMPanel';
import MTMTextField from 'components/Presentational/MTMTextField';
import { Status } from 'models/App';
import { ITagItem } from 'models/Tags';
import React, { FC, useState } from 'react';

interface ITagPanelProps extends ITagItem {
  saveItem(item: ITagItem): void;
  saveStatus: Status;
}

const TagPanel: FC<ITagPanelProps> = (props: ITagPanelProps) => {
  const [name, setName] = useState(props.name);
  const [body, setBody] = useState(props.body);
  const [triggers, setTriggers] = useState(props.triggers.join(', '));

  const onSaveClick = () => {
    const tagItem = {
      name,
      body,
      id: props.id,
      triggers: triggers
        .split(',')
        .map(s => Number(s.trim()))
        .filter(n => n && !isNaN(n))
    };
    props.saveItem(tagItem);
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
        label={'Triggers'}
        maxLength={50}
        value={triggers}
        onValueChange={setTriggers}
      />
      <MTMTextField
        label={'Body'}
        value={body}
        onValueChange={setBody}
        rows={4}
        multiline
      />
    </>
  );

  return (
    <MTMPanel
      headerText={props.id === -1 ? 'Add Tag' : 'Edit Tag'}
      onSaveClick={onSaveClick}
      content={content}
      isActionInProgress={props.saveStatus === Status.Loading}
      isFormValid={Boolean(name)}
    />
  );
};

export default TagPanel;
