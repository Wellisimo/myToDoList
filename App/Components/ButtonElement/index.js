import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const buttonElement = props => {
  const isLightThemeEnabled = useSelector(state => state.isLightThemeEnabled);
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  return (
    <TouchableOpacity style={[styles.buttonContainer, globalStyles.buttonContainer]} onPress={props.onPress}>
      <Text style={globalStyles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default buttonElement;

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
