import React, { useState, useEffect } from "react";
import {
  DefaultButton,
  PrimaryButton,
  Panel,
  TextField
} from "office-ui-fabric-react";

interface ITriggerPanel {
  name?: string;
  eventType?: string;
  tags?: string;
  filter?: string;
}

const TriggerPanel: React.FC<ITriggerPanel> = (props: ITriggerPanel) => {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [tags, setTags] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const { name, eventType, tags, filter } = props;
    setIsOpen(true);
    setName(name || "");
    setEventType(eventType || "");
    setTags(tags || "");
    setFilter(filter || "");
    return () => {
      setIsOpen(false);
      setName("");
      setEventType("");
      setTags("");
      setFilter("");
    };
  }, [props.name, props.eventType, props.tags, props.filter]);

  const onTagSave = () => {
    console.log("Save the values", name, eventType, tags, filter);
  };

  const renderSaveCancel = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PrimaryButton onClick={() => onTagSave()}>Save</PrimaryButton>
        <DefaultButton
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </DefaultButton>
      </div>
    );
  };

  return (
    <Panel
      isOpen={isOpen}
      closeButtonAriaLabel="Close"
      isHiddenOnDismiss={true}
      headerText="Add Triggers"
      onDismiss={() => setIsOpen(false)}
      onRenderFooterContent={() => renderSaveCancel()}
    >
      <TextField
        label={"Name"}
        value={name}
        onChange={(
          _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
          newValue?: string | undefined
        ) => setName(newValue || "")}
        required
      />
      <TextField label={"Event Type"} required />
      <TextField label={"Filter"} />
      <TextField label={"Tags"} />
    </Panel>
  );
};

export default TriggerPanel;
