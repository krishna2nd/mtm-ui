import React from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react";

interface IMTMDialogProps {
  isVisible: boolean;
  onConfirm(): void;
  onCancel(): void;
}

const MTMDialog: React.FC<IMTMDialogProps> = (props: IMTMDialogProps) => (
  <Dialog
    hidden={!props.isVisible}
    dialogContentProps={{
      type: DialogType.normal,
      title: "Are you sure?",
      subText: "Deleting will permanently remove this item."
    }}
    modalProps={{
      styles: { main: { maxWidth: 450 } },
      isBlocking: true
    }}
  >
    <DialogFooter>
      <PrimaryButton onClick={props.onConfirm} text="Yes" />
      <DefaultButton onClick={props.onCancel} text="No" />
    </DialogFooter>
  </Dialog>
);

export default MTMDialog;
