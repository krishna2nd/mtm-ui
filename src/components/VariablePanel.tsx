import React, { useState } from "react";
import { Panel, TextField } from "office-ui-fabric-react";

const VariablePanel: React.FC = props => {
  const [isOpen, setIsOpen] = useState(false);

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
