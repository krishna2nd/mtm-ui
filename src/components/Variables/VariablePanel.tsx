import React, { useState } from "react";
import { TextField } from "office-ui-fabric-react";
import { IVariableItem } from "../../models/Variables";
import { Status } from "../../models/App";
import MTMPanel from "../Presentational/MTMPanel";

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
      <TextField
        value={name}
        label={"Name"}
        onChange={(_: React.FormEvent, newValue = "") => setName(newValue)}
        required
      />
      <TextField
        value={type}
        label={"Type"}
        onChange={(_: React.FormEvent, newValue = "") => setType(newValue)}
        required
      />
      <TextField
        value={body}
        label={"Body"}
        onChange={(_: React.FormEvent, newValue = "") => setBody(newValue)}
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
