import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useAppSelector } from '../../redux/useAppSelector';
import Typography from '../Typography';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

type ButtonProps = {
  onPress: () => void;
  title: string;
};

const ButtonElement: React.FC<ButtonProps> = ({ onPress, title }) => {
  const isLightThemeEnabled = useAppSelector(({ isLightThemeEnabled }) => isLightThemeEnabled);
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  return (
    <TouchableOpacity style={[styles.buttonContainer, globalStyles.buttonContainer]} onPress={onPress}>
      <Typography type={'h5'} darkModeEnabled={!isLightThemeEnabled} fontWeight={'normal'}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default ButtonElement;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 105,
    height: 23,
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
});
