import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton
} from 'office-ui-fabric-react';
import React, { FC } from 'react';

interface IMTMDialogProps {
  isVisible: boolean;
  onConfirm(): void;
  onCancel(): void;
}

const MTMDialog: FC<IMTMDialogProps> = (props: IMTMDialogProps) => {
  if (!props.isVisible) {
    return null;
  }
  return (
    <Dialog
      hidden={false}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Are you sure?',
        subText: 'Deleting will permanently remove this item.'
      }}
      modalProps={{
        styles: { main: { maxWidth: 450 } },
        isBlocking: true
      }}
    >
      <DialogFooter>
        <PrimaryButton onClick={props.onConfirm} text={'Yes'} />
        <DefaultButton onClick={props.onCancel} text={'No'} />
      </DialogFooter>
    </Dialog>
  );
};

export default MTMDialog;
