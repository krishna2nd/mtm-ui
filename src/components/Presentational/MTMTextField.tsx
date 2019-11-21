import {
  DefaultPalette,
  ITextFieldProps,
  TextField
} from 'office-ui-fabric-react';
import React, { FormEvent } from 'react';
import { debounce } from 'Utils';

interface IMTMTextFieldProps extends ITextFieldProps {
  onValueChange?(newValue: string): void;
}

export default (props: IMTMTextFieldProps) => {
  const onValueChange = (_: FormEvent, newValue = '') => {
    if (props.onValueChange) {
      props.onValueChange(newValue);
    }
  };
  return (
    <TextField
      {...props}
      autoComplete={'off'}
      styles={{
        root: { padding: '8px 0' },
        fieldGroup: { borderColor: DefaultPalette.neutralTertiaryAlt }
      }}
      spellCheck={false}
      onChange={debounce(onValueChange)}
    />
  );
};
