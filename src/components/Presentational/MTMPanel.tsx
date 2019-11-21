import {
  PrimaryButton,
  DefaultButton,
  Panel,
  Spinner,
  SpinnerSize,
  FontSizes,
  DefaultPalette,
  FontWeights
} from "office-ui-fabric-react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onCancelClick: () => dispatch({ type: "onCancelClick" })
});

interface IMTMPanelProps extends ReturnType<typeof mapDispatchToProps> {
  headerText: string;
  isFormValid: boolean;
  isActionInProgress: boolean;
  content: JSX.Element;
  onSaveClick(): void;
}

const MTMPanel: React.FC<IMTMPanelProps> = (props: IMTMPanelProps) => (
  <Panel
    isOpen
    closeButtonAriaLabel="Close"
    headerText={props.headerText}
    onDismiss={props.onCancelClick}
    onRenderFooterContent={() => renderFooterContent(props)}
  >
    {props.content}
  </Panel>
);

const renderFooterContent = (props: IMTMPanelProps) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <PrimaryButton
      onClick={props.isActionInProgress ? undefined : props.onSaveClick}
      styles={{ root: { width: 110 } }}
      disabled={!props.isFormValid}
    >
      {props.isActionInProgress ? (
        <Spinner
          size={SpinnerSize.small}
          label={"Saving..."}
          labelPosition={"left"}
          styles={{
            label: {
              color: DefaultPalette.white,
              fontSize: FontSizes.medium,
              fontWeight: FontWeights.semibold
            }
          }}
        />
      ) : (
        "Save"
      )}
    </PrimaryButton>
    <DefaultButton onClick={props.onCancelClick}>Cancel</DefaultButton>
  </div>
);

export default connect(null, mapDispatchToProps)(MTMPanel);
