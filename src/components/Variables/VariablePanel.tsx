import React, { useState } from "react";
import { IVariableItem } from "../../models/Variables";
import { Status } from "../../models/App";
import MTMPanel from "../Presentational/MTMPanel";
import MTMTextField from "../Presentational/MTMTextField";

interface IVariablePanel extends IVariableItem {}

const VariablePanel: React.FC<IVariablePanel> = (props: IVariablePanel) => {
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.type);
  const [body, setBody] = useState(props.body);
  const [saveStatus, setSaveStatus] = useState(Status.NotYetStarted);

  const onSaveClick = () => {
    setSaveStatus(Status.Loading);
    fetch("https://ms-tagmanager.azurewebsites.net/tags", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, type })
    })
      .then(() => setSaveStatus(Status.Completed))
      .catch(() => setSaveStatus(Status.Failed));
  };

  const content = (
    <>
      <MTMTextField
        value={name}
        label={"Name"}
        onValueChange={setName}
        required
      />
      <MTMTextField
        value={type}
        label={"Type"}
        onValueChange={setType}
        required
      />
      <MTMTextField
        value={body}
        label={"Body"}
        onValueChange={setBody}
        required
      />
    </>
  );

  return (
    <MTMPanel
      headerText="Add Variables"
      onSaveClick={onSaveClick}
      content={content}
      isFormValid
      isActionInProgress={saveStatus === Status.Loading}
    />
  );
};

export default VariablePanel;
