import React, { useState } from "react";
import { ITagItem } from "../../models/Tags";
import { Status } from "../../models/App";
import MTMPanel from "../Presentational/MTMPanel";
import MTMTextField from "../Presentational/MTMTextField";

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
      <MTMTextField
        label={"Name"}
        value={name}
        onValueChange={setName}
        required
      />
      <MTMTextField
        label={"Triggers"}
        value={triggers}
        onValueChange={setTriggers}
      />
      <MTMTextField label={"Body"} value={body} onValueChange={setBody} />
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
