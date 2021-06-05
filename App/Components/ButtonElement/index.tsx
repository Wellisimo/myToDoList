import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../Helpers/Types';
import Typography from '../Text';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

type ButtonProps = {
  onPress: () => void;
  title: string;
}

const ButtonElement: React.FC<ButtonProps> = ({ onPress, title }) => {
  const isLightThemeEnabled = useSelector(({ isLightThemeEnabled }: RootState) => isLightThemeEnabled);
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  return (
    <TouchableOpacity style={[styles.buttonContainer, globalStyles.buttonContainer]} onPress={onPress}>
      <Typography type={'h5'} color={isLightThemeEnabled ? 'black' : 'white'} fontWeight={'normal'}>
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
    marginVertical: 2,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
});
