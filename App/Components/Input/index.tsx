import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface Message {
  message: string;
}

type InputProps = {
  text: string;
  textInputHandler: (message: string) => void;
  placeholder: string;
  onFocus: (message: Message) => void;
}

const Input: React.FC<InputProps> = ({ text, textInputHandler, placeholder, onFocus }) => {
  return (
    <View style={styles.textContainer}>
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        value={text}
        onChangeText={textInputHandler}
        placeholder={placeholder}
        onFocus={() => onFocus({ message: 'Input' })}
      />
    </View>
  );
};

export default Input;

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
