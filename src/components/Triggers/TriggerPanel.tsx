import React, { useState } from "react";
import { TextField } from "office-ui-fabric-react";
import { Status } from "../../models/App";
import { ITriggerItem } from "../../models/Triggers";
import MTMPanel from "../Presentational/MTMPanel";

interface ITriggerPanelProps extends ITriggerItem {}

const TriggerPanel: React.FC<ITriggerPanelProps> = (
  props: ITriggerPanelProps
) => {
  const [name, setName] = useState(props.name);
  const [eventType, setEventType] = useState(props.eventType);

  const [saveStatus, setSaveStatus] = useState(Status.NotYetStarted);

  const onSaveClick = () => {
    setSaveStatus(Status.Loading);
    fetch("https://ms-tagmanager.azurewebsites.net/tags", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, eventType })
    })
      .then(() => setSaveStatus(Status.Completed))
      .catch(() => setSaveStatus(Status.Failed));
  };

  const content = (
    <>
      <TextField
        label={"Name"}
        value={name}
        onChange={(_: React.FormEvent, newValue = "") => setName(newValue)}
        required
      />
      <TextField
        label={"Event Type"}
        onChange={(_: React.FormEvent, newValue = "") => setEventType(newValue)}
        required
      />
    </>
  );

  return (
    <MTMPanel
      headerText="Add Trigger"
      onSaveClick={onSaveClick}
      content={content}
      isActionInProgress={saveStatus === Status.Loading}
      isFormValid
    />
  );
};

export default TriggerPanel;
