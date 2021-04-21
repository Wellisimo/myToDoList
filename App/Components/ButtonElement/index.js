
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import globalStyles from '../../Styles';

const buttonElement = (props) => {
    return (
        <TouchableOpacity
          style={[styles.buttonContainer, globalStyles.buttonContainer]}
          onPress={props.onPress}
        >
          <Text
            style={globalStyles.buttonText}
          >
            {props.title}
          </Text>
        </TouchableOpacity>
    )
}

export default buttonElement;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 25,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  }
});