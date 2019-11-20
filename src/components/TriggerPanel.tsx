import React, { useState } from "react";
import { Panel, TextField } from "office-ui-fabric-react";

interface ITriggerPanel {
  name?: string;
  eventType?: string;
  tags?: string;
  filter?: number;
}

const TriggerPanel: React.FC<ITriggerPanel> = (props: ITriggerPanel) => {
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
      <TextField label={"Event Type"} required />
      <TextField label={"Filter"} />
      <TextField label={"Tags"} />
    </Panel>
  );
};

export default TriggerPanel;
