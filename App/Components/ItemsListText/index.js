import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { ActionSheet } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';

import { markItem, deleteItem, updateItem, addHistory } from '../../redux/actions';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const itemsListText = props => {
  const [text, setText] = useState(props.item.value);
  const [editable, setEditable] = useState(false);
  const input = useRef(null);
  const style = useSelector(state => state.style);
  const dispatch = useDispatch();
  const globalStyles = style ? globalStylesWhite : globalStylesDark;

  useEffect(() => {
    console.log(`List item ${props.item.value} rendered`);
    if (input.current && !input.current.isFocused()) {
      setText(props.item.value);
    }
  });

  return editable ? (
    <TextInput
      ref={input}
      style={[
        styles.textInput,
        globalStyles.mainText,
        props.item.done ? { textDecorationLine: 'line-through', color: '#878787' } : null,
      ]}
      value={text}
      editable={editable}
      onEndEditing={() => {
        setEditable(false);
      }}
      onSubmitEditing={() => {
        dispatch(addHistory());
        dispatch(updateItem(props.item.value, text));
      }}
      onChangeText={setText}
      onLayout={() => input.current.focus()}
    />
  ) : (
    <Text
      style={[
        styles.listText,
        globalStyles.mainText,
        props.item.done ? { textDecorationLine: 'line-through', color: '#878787' } : null,
      ]}
      onPress={() => {
        setEditable(true);
      }}
      onLongPress={() =>
        ActionSheet.show(
          {
            options: [`mark as ${props.item.done ? 'undone' : 'done'}`, 'delete', 'Cancle'],
            cancelButtonIndex: 2,
            title: `I want item: '${props.item.value}' to:`,
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                dispatch(addHistory());
                dispatch(markItem(props.item.value));
                break;
              case 1:
                dispatch(addHistory());
                dispatch(deleteItem(props.item.value));
                break;
            }
          },
        )
      }>
      {props.item.value}
    </Text>
  );
};

export default React.memo(itemsListText);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listText: {
    padding: 2,
    width: '100%',
  },
  textInput: {
    width: '100%',
  },
});
