import React, { useState, useEffect } from "react";
import {
  Panel,
  TextField,
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react";

interface ITagPanel {
  name?: string;
  type?: string;
  triggers?: string;
}

const TagPanel: React.FC<ITagPanel> = (props: ITagPanel) => {
  debugger;
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [triggers, setTriggers] = useState("");

  useEffect(() => {
    const { name, type, triggers } = props;
    setIsOpen(true);
    setName(name || "");
    setType(type || "");
    setTriggers(triggers || "");
    return () => {
      setIsOpen(false);
      setName("");
      setType("");
      setTriggers("");
    };
  }, [props.name, props.type, props.triggers]);

  const onTagSave = () => {
    console.log("Save the values", name, type, triggers);
  };

  const renderSaveCancel = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PrimaryButton onClick={() => onTagSave()}>Save</PrimaryButton>
        <DefaultButton
          onClick={() => {
            // setIsCancel(true);
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
      headerText="Add Tag"
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
      <TextField
        label={"Type"}
        value={type}
        onChange={(
          _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
          newValue?: string | undefined
        ) => setType(newValue || "")}
        required
      />
      <TextField
        label={"Triggers"}
        value={triggers}
        onChange={(
          _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
          newValue?: string | undefined
        ) => setTriggers(newValue || "")}
      />
    </Panel>
  );
};

export default TagPanel;
