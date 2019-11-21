import MTMPanel from 'components/Presentational/MTMPanel';
import MTMTextField from 'components/Presentational/MTMTextField';
import { Status } from 'models/App';
import { IVariableItem, VariableTypes } from 'models/Variables';
import {
  DefaultPalette,
  Dropdown,
  IDropdownOption
} from 'office-ui-fabric-react';
import React, { FC, FormEvent, useState } from 'react';

interface IVariablePanel extends IVariableItem {
  saveItem(item: IVariableItem): void;
  saveStatus: Status;
}

const VariablePanel: FC<IVariablePanel> = (props: IVariablePanel) => {
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.type);
  const [body, setBody] = useState(props.body);

  const onSaveClick = () => {
    const variableItem = { name, type, body, id: props.id };
    props.saveItem(variableItem);
  };

  const onTypeChange = (_: FormEvent, option?: IDropdownOption) => {
    setType(option!.key.toString());
  };

  const content = (
    <>
      <MTMTextField
        value={name}
        label={'Name'}
        onValueChange={setName}
        required
      />
      <Dropdown
        placeholder={'Select one'}
        label={'Type'}
        selectedKey={type}
        options={VariableTypes}
        styles={{
          title: { borderColor: DefaultPalette.neutralTertiaryAlt }
        }}
        onChange={onTypeChange}
        required
      />
      <MTMTextField
        value={body}
        label={'Body'}
        onValueChange={setBody}
        rows={4}
        multiline
      />
    </>
  );

  return (
    <MTMPanel
      headerText={props.id === -1 ? 'Add Variables' : 'Edit Variables'}
      onSaveClick={onSaveClick}
      content={content}
      isActionInProgress={props.saveStatus === Status.Loading}
      isFormValid={Boolean(name) && Boolean(type)}
    />
  );
};

export default VariablePanel;
