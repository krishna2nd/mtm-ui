import React, { useState } from "react";
import { IVariableItem } from "../../models/Variables";
import { Status } from "../../models/App";
import MTMPanel from "../Presentational/MTMPanel";
import MTMTextField from "../Presentational/MTMTextField";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { saveVariablesItem } from "../../service/Api";

interface IVariablePanel extends IVariableItem {}

const VariablePanel: React.FC<IVariablePanel> = (props: IVariablePanel) => {
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.type);
  const [body, setBody] = useState(props.body);
  const [saveStatus, setSaveStatus] = useState(Status.NotYetStarted);

  const onSaveClick = () => {
    setSaveStatus(Status.Loading);
    const variableItem = { name, type, body, id: props.id };
    saveVariablesItem(variableItem)
      .then(() => setSaveStatus(Status.Completed))
      .catch(() => setSaveStatus(Status.Failed));
  };

  const options: IDropdownOption[] = [
    { key: "function", text: "FUNCTION" },
    { key: "custom", text: "CUSTOM" },
    { key: "data_layer", text: "DATA_LAYER" },
    { key: "cookie", text: "COOKIE" }
  ];

  const onTypeChange = (_: React.FormEvent, option?: IDropdownOption) => {
    setType(option!.text);
  };

  const content = (
    <>
      <MTMTextField
        value={name}
        label={"Name"}
        onValueChange={setName}
        required
      />
      <Dropdown
        placeholder="Select Type"
        label="Select Type"
        options={options}
        onChange={onTypeChange}
      />
      <MTMTextField
        value={body}
        label={"Body"}
        onValueChange={setBody}
        rows={4}
        multiline
        required
      />
    </>
  );

  return (
    <MTMPanel
      headerText={props.id === -1 ? "Add Variables" : "Edit Variables"}
      onSaveClick={onSaveClick}
      content={content}
      isFormValid
      isActionInProgress={saveStatus === Status.Loading}
    />
  );
};

export default VariablePanel;
