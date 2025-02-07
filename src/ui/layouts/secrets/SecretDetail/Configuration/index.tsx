import React from 'react';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  FlexBox,
  Box,
  FormTextField,
  FormDropdownField,
  PrimaryButton,
  FullWidthSpinner,
  // H4,
  // GhostButton,
  // icons,
  // Row,
  // FullWidthSpinner,
  // Container,
  // EditField,
  // Paragraph,
} from '../../../../components';
import SelectorDisabled from '../../Selector/SelectorDisabled';
// import { iconColors, iconSizes } from '../../../../../constants';

// import { useDispatch } from '../../../../hooks';
// import { showToasterAction } from '../../../../../redux/actions';
// import { toasterTypes } from '../../../../../constants';

// import { translate } from '../translate';

// import styles from './index.module.scss';
import { useService } from './useService';
import { routePaths } from '../../../../../routes/routePaths';
import { useHistory, useSelector } from '../../../../hooks';
import { workspaceSelectors } from '../../../../../redux/selectors';
// import { StackBox } from '../../../common/StackBox';
// import { SidePopup } from '../../RegisterSecret/ListForAll/SidePopup';
// import { NonEditableConfig } from '../../../NonEditableConfig';
// import {
//   useDispatch,
//   // useHistory,
//   // useLocation,
//   useSelector,
// } from '../../../../hooks';
// import {
//   sessionSelectors,
//   userSelectors,
//   workspaceSelectors,
// } from '../../../../../redux/selectors';
// import {
//   showToasterAction,
//   stackComponentsActions,
//   secretsActions,
// } from '../../../../../redux/actions';
// import { toasterTypes } from '../../../../../constants';
// import axios from 'axios';
// import { routePaths } from '../../../../../routes/routePaths';
// import { ToggleField } from '../../../common/FormElement';
// import { SidePopup } from '../../../common/SidePopup';

export const Configuration: React.FC<{
  secretId: TId;
  tiles?: any;
  fetching?: boolean;
}> = ({ secretId, fetching }) => {
  // const dispatch = useDispatch();
  const { secret } = useService({ secretId });
  const history = useHistory();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <FlexBox.Column marginLeft="xl">
      <Box marginTop="lg" style={{ width: '329px' }}>
        <FormTextField
          label={'Secret name'}
          labelColor="rgba(66, 66, 64, 0.5)"
          placeholder={'Ex.John Doe'}
          value={secret?.name}
          disabled
          onChange={() => {}}
        />
      </Box>
      <Box marginTop="lg" style={{ width: '329px' }}>
        <FormDropdownField
          label={'Scope'}
          labelColor="rgba(66, 66, 64, 0.5)"
          placeholder={'Choose a scope'}
          value={secret?.scope}
          onChange={() => {}}
          disabled
          options={[] as any}
          style={{ paddingLeft: '10px' }}
        />
      </Box>

      <Box marginTop="md">
        <SelectorDisabled inputFields={secret.values} width='329px' />
      </Box>

      <FlexBox
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          marginRight: '45px',
        }}
      >
        <Box marginBottom="lg">
          <PrimaryButton
            onClick={() =>
              history.push(
                routePaths.secret.updateSecret(secret.id, selectedWorkspace),
              )
            }
            style={{
              background: '#FFFFFF',    
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              borderRadius: '4px',
              color: '#443E99',
          
            }}
          >
            Update Secret
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
