import React, { useState, useEffect } from "react";
import { Panel, TextField } from "office-ui-fabric-react";

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

  return (
    <Panel
      isOpen={isOpen}
      closeButtonAriaLabel="Close"
      isHiddenOnDismiss={true}
      headerText="Add Variables"
      onDismiss={() => setIsOpen(false)}
    >
      <TextField label={"Name"} required />
      <TextField label={"Type"} required />
    </Panel>
  );
};

export default VariablePanel;
