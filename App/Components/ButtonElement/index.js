import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const buttonElement = props => {
  const style = useSelector(state => state.style);
  const globalStyles = style ? globalStylesWhite : globalStylesDark;

  return (
    <TouchableOpacity style={[styles.buttonContainer, globalStyles.buttonContainer]} onPress={props.onPress}>
      <Text style={globalStyles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default buttonElement;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 25,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
});
