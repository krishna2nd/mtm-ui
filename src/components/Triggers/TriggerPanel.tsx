import React, { useState } from "react";
import { Status } from "../../models/App";
import { ITriggerItem } from "../../models/Triggers";
import MTMPanel from "../Presentational/MTMPanel";
import MTMTextField from "../Presentational/MTMTextField";
import { saveTriggerItem } from "../../service/Api";

interface ITriggerPanelProps extends ITriggerItem {}

const TriggerPanel: React.FC<ITriggerPanelProps> = (
  props: ITriggerPanelProps
) => {
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.type);

  const [saveStatus, setSaveStatus] = useState(Status.NotYetStarted);

  const onSaveClick = () => {
    setSaveStatus(Status.Loading);
    const triggerItem = { name, type, body: props.body, id: props.id };
    saveTriggerItem(triggerItem)
      .then(() => setSaveStatus(Status.Completed))
      .catch(() => setSaveStatus(Status.Failed));
  };

  const content = (
    <>
      <MTMTextField
        label={"Name"}
        maxLength={50}
        value={name}
        onValueChange={setName}
        required
      />
      <MTMTextField
        label={"Event Type"}
        maxLength={50}
        value={type}
        onValueChange={setType}
        required
      />
      <MTMTextField
        label={"Body"}
        value={props.body}
        multiline
        rows={4}
        readOnly
      />
    </>
  );

  return (
    <MTMPanel
      headerText={props.id === -1 ? "Add Trigger" : "Edit Trigger"}
      onSaveClick={onSaveClick}
      content={content}
      isActionInProgress={saveStatus === Status.Loading}
      isFormValid
    />
  );
};

export default TriggerPanel;
