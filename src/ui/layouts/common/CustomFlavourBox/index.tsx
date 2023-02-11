import React, { useState } from 'react';
import { Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import imageAddIcon from '../../../assets/imageAddIcon.svg';

export const CustomFlavourBox: React.FC<{
  flavourName: string;
  flavourDesc: string;
  logoUrl: string;
  onSelectFlavor: any;
}> = ({ flavourName, flavourDesc, logoUrl, onSelectFlavor }) => {
  const [select, setSelect] = useState(false);

  return (
    <Box
      paddingHorizontal="sm2"
      paddingVertical="sm2"
      className={styles.customFlavourBox}
      style={{ background: select ? '#443E99' : '#fff' }}
      onClick={onSelectFlavor}
    >
      <Box className={styles.imageContainer}>
        <label className={styles.custom_file_upload}>
          <input type="file" name="img" accept="image/*" />
          <img src={logoUrl} alt="imageAddIcon" />
        </label>
      </Box>

      <Box style={{ marginTop: '12px' }}>
        <Paragraph
          className={styles.flavourName}
          style={{ color: select ? '#fff' : '#443E99' }}
        >
          {flavourName}
        </Paragraph>
      </Box>

      <Box marginTop="sm2" marginBottom="xxl2">
        <Paragraph
          className={styles.flavourDesc}
          style={{ color: select ? '##D8C6FC' : '#A8A8A8' }}
        >
          {flavourDesc}
        </Paragraph>
      </Box>
    </Box>
  );
};
