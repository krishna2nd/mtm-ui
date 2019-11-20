import React, { useState } from "react";
import { Panel, TextField } from "office-ui-fabric-react";

interface IVariablePanel {
  name?: string;
  type?: string;
}

const VariablePanel: React.FC<IVariablePanel> = (props: IVariablePanel) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Panel
      isOpen={isOpen}
      closeButtonAriaLabel="Close"
      isHiddenOnDismiss={true}
      headerText="Add Tag"
      onDismiss={() => setIsOpen(false)}
    >
      <TextField label={"Name"} required />
      <TextField label={"Type"} required />
    </Panel>
  );
};

export default VariablePanel;
