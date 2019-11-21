import { ITextFieldProps, TextField } from "office-ui-fabric-react";
import React from "react";
import { debounce } from "../../Utils";

interface IMTMTextFieldProps extends ITextFieldProps {
  onValueChange?(newValue: string): void;
}

export default (props: IMTMTextFieldProps) => {
  const onValueChange = (_: React.FormEvent, newValue = "") => {
    if (props.onValueChange) {
      props.onValueChange(newValue);
    }
  };
  return (
    <TextField
      {...props}
      autoComplete={"off"}
      styles={{ root: { padding: "8px 0" } }}
      spellCheck={false}
      onChange={debounce(onValueChange)}
    />
  );
};
