import React, { useState, useEffect } from "react";
import {
  Panel,
  TextField,
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react";

interface IVariablePanel {
  name?: string;
  type?: string;
}

const VariablePanel: React.FC<IVariablePanel> = (props: IVariablePanel) => {
  const [isOpen, setIsOpen] = useState(true);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  debugger;
  useEffect(() => {
    const { name, type } = props;
    setIsOpen(true);
    setName(name || "");
    setType(type || "");
    return () => {
      setIsOpen(false);
      setName("");
      setType("");
    };
  }, [props.name, props.type]);

  const onTagSave = () => {
    console.log("Save the values", name, type);
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
      headerText="Add Variables"
      onDismiss={() => setIsOpen(false)}
      onRenderFooterContent={() => renderSaveCancel()}
    >
      <TextField value={name} label={"Name"} required />
      <TextField value={type} label={"Type"} required />
    </Panel>
  );
};

export default VariablePanel;
