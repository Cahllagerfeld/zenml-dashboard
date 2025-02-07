import React, { useState } from 'react';
import { Box, FlexBox, FormTextField, Paragraph } from '../../../components';
import styles from './index.module.scss';

export function Form(props: any) {
  return <div {...props}>{props.children}</div>;
}

export function TextField(props: any) {
  const { name, label, onHandleChange, required } = props;
  const [text, setText] = useState(props?.default);
  console.log(required, name, 'requiredrequiredrequired');
  return (
    <Box marginTop="md">
      <FormTextField
        onChange={(e: any) => {
          setText(e);
          onHandleChange(name, e);
        }}
        required={!!required}
        // disabled={props.disable}
        label={label}
        value={text}
        placeholder={''}
      />
    </Box>
  );
}

// export function ToggleField(props: any) {
//   const { name, onHandleChange, label } = props;
//   return (
//     <Box marginVertical="md">
//       <FlexBox.Row justifyContent="space-between" alignItems="center">
//         <Box>
//           <Paragraph size="body" style={{ color: '#000' }}>
//             {label}
//           </Paragraph>
//         </Box>
//         <Box>
//           <label className={styles.switch}>
//             <input
//               type="checkbox"
//               onChange={(event) => onHandleChange(name, event.target.checked)}
//             />
//             <span className={`${styles.slider} ${styles.round}`}></span>
//           </label>
//         </Box>
//       </FlexBox.Row>
//     </Box>
//   );
// }

export function ToggleField(props: any) {
  const { value, onHandleChange, label, disabled } = props;

  return (
    <Box style={{ height: '68px' }}>
      <FlexBox.Row justifyContent="space-between" flexDirection="column">
        <Box>
          <Paragraph size="body" style={{ color: '#000' }}>
            {label}
          </Paragraph>
        </Box>
        <FlexBox.Row className={styles.switchContainer}>
          <div className={styles.switchLabel}>
            <span>{value ? <>Yes</> : <>No</>}</span>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              defaultChecked={value}
              // checked={value}
              onChange={onHandleChange}
              disabled={disabled}
            />
            {disabled ? (
              <span className={`${styles.slider} ${styles.round}`}></span>
            ) : (
              <span className={`${styles.sliderBlue} ${styles.round}`}></span>
            )}
          </label>
        </FlexBox.Row>
      </FlexBox.Row>
    </Box>
  );
}

// export function SubmitButton(props: any) {
//   const { title, ...rest } = props;
//   console.log(props, 'asdasdasdasd222221111');
//   // const { isSubmitting } = useFormikContext();

//   return (
//     <PrimaryButton type="submit" {...rest}>
//       {title}
//     </PrimaryButton>
//   );
// }
