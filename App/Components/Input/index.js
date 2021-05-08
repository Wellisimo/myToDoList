import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const input = props => {
  const style = useSelector(state => state.style);
  const globalStyles = style ? globalStylesWhite : globalStylesDark;

  return (
    <View style={styles.textContainer}>
      <TextInput
        style={styles.textInput}
        value={props.text}
        onChangeText={props.textInputHandler}
        placeholder={props.placeholder}
        onFocus={props.onFocus}
      />
    </View>
  );
};

export default input;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingLeft: 5,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    width: '95%',
    backgroundColor: 'white',
  },
});
