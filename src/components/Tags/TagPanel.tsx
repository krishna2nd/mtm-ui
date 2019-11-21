import React, { useState } from "react";
import { ITagItem } from "../../models/Tags";
import { Status } from "../../models/App";
import MTMPanel from "../Presentational/MTMPanel";
import MTMTextField from "../Presentational/MTMTextField";
import { saveTagItem } from "../../service/Api";

interface ITagPanelProps extends ITagItem {
  refreshItems(): void;
}

const TagPanel: React.FC<ITagPanelProps> = (props: ITagPanelProps) => {
  const [name, setName] = useState(props.name);
  const [body, setBody] = useState(props.body);
  const [triggers, setTriggers] = useState(props.triggers.join(", "));
  const [saveStatus, setSaveStatus] = useState(Status.NotYetStarted);

  const onSaveClick = () => {
    setSaveStatus(Status.Loading);
    const tagItem = {
      name,
      body,
      id: props.id,
      triggers: triggers
        .split(",")
        .map(s => Number(s.trim()))
        .filter(n => n && !isNaN(n))
    };
    saveTagItem(tagItem)
      .then(() => setSaveStatus(Status.Completed))
      .then(props.refreshItems)
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
        label={"Triggers"}
        maxLength={50}
        value={triggers}
        onValueChange={setTriggers}
      />
      <MTMTextField
        label={"Body"}
        value={body}
        onValueChange={setBody}
        rows={4}
        multiline
      />
    </>
  );

  return (
    <MTMPanel
      headerText={props.id === -1 ? "Add Tag" : "Edit Tag"}
      onSaveClick={onSaveClick}
      content={content}
      isActionInProgress={saveStatus === Status.Loading}
      isFormValid={Boolean(name)}
    />
  );
};

export default TagPanel;
