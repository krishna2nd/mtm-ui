import {
  DefaultButton,
  DefaultPalette,
  FontSizes,
  FontWeights,
  Panel,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onPanelDismiss: () => dispatch({ type: 'onPanelDismiss' })
});

interface IMTMPanelProps extends ReturnType<typeof mapDispatchToProps> {
  headerText: string;
  isFormValid: boolean;
  isActionInProgress: boolean;
  content: JSX.Element;
  onSaveClick(): void;
}

const MTMPanel: FC<IMTMPanelProps> = (props: IMTMPanelProps) => (
  <Panel
    isOpen
    type={PanelType.medium}
    styles={{ main: { padding: '10px 20px' } }}
    closeButtonAriaLabel="Close"
    headerText={props.headerText}
    onDismiss={props.onPanelDismiss}
    onRenderFooterContent={() => renderFooterContent(props)}
  >
    {props.content}
  </Panel>
);

const renderFooterContent = (props: IMTMPanelProps) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <PrimaryButton
      onClick={props.isActionInProgress ? undefined : props.onSaveClick}
      styles={{ root: { width: 110 } }}
      disabled={!props.isFormValid}
    >
      {props.isActionInProgress ? (
        <Spinner
          size={SpinnerSize.small}
          label={'Saving...'}
          labelPosition={'left'}
          styles={{
            label: {
              color: DefaultPalette.white,
              fontSize: FontSizes.medium,
              fontWeight: FontWeights.semibold
            }
          }}
        />
      ) : (
        'Save'
      )}
    </PrimaryButton>
    <DefaultButton
      onClick={props.onPanelDismiss}
      styles={{ root: { borderColor: DefaultPalette.neutralQuaternary } }}
    >
      Cancel
    </DefaultButton>
  </div>
);

export default connect(null, mapDispatchToProps)(MTMPanel);
