import React, { useState } from "react";
import { TextField } from "office-ui-fabric-react";
import { ITagItem } from "../../models/Tags";
import { Status } from "../../models/App";
import MTMPanel from "../Presentational/MTMPanel";

interface ITagPanelProps extends ITagItem {}

const TagPanel: React.FC<ITagPanelProps> = (props: ITagPanelProps) => {
  const [name, setName] = useState(props.name);
  const [body, setBody] = useState(props.body);
  const [triggers, setTriggers] = useState(props.triggers.join(", "));
  const [saveStatus, setSaveStatus] = useState(Status.NotYetStarted);

  const onSaveClick = () => {
    setSaveStatus(Status.Loading);
    fetch("https://ms-tagmanager.azurewebsites.net/tags", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        body,
        triggers: triggers
          .split(",")
          .map(t => Number(t.trim()))
          .filter(n => n && !isNaN(n))
      })
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
        label={"Triggers"}
        value={triggers}
        onChange={(_: React.FormEvent, newValue = "") => setTriggers(newValue)}
      />
      <TextField
        label={"Body"}
        value={body}
        onChange={(_: React.FormEvent, newValue = "") => setBody(newValue)}
      />
    </>
  );

  return (
    <MTMPanel
      headerText="Add Tag"
      onSaveClick={onSaveClick}
      content={content}
      isActionInProgress={saveStatus === Status.Loading}
      isFormValid
    />
  );
};

export default TagPanel;
