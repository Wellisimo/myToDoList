import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ActionSheet } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';

import { markItem, deleteItem, updateItem, addHistory } from '../../redux/actions';
import { RootState, ItemObject } from '../../Helpers/Types';
import Typography from '../Text';

type ItemsListTextProps = {
  item: ItemObject;
  onPress: (arg: {message: string}) => void;
}

const ItemsListText: React.FC<ItemsListTextProps> = ({item, onPress}) => {
  const [text, setText] = useState(item.value);
  const [editable, setEditable] = useState(false);
  const input = useRef<TextInput>(null);

  const isLightThemeEnabled = useSelector(({isLightThemeEnabled}: RootState) => isLightThemeEnabled);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(`List item ${props.item.value} rendered`);
    if (input.current && !input.current.isFocused()) {
      setText(item.value);
    }
  });

  return editable ? (
    <TextInput
      ref={input}
      style={[
        styles.textInput,
        { color: isLightThemeEnabled ? 'black' : 'white' },
        item.done ? { textDecorationLine: 'line-through', color: '#878787' } : null,
      ]}
      value={text}
      editable={editable}
      onEndEditing={() => {
        setEditable(false);
      }}
      onSubmitEditing={() => {
        dispatch(addHistory());
        dispatch(updateItem(item.value, text));
      }}
      onChangeText={setText}
      onLayout={() => input.current && input.current.focus()}
    />
  ) : (
    <Typography
      color={isLightThemeEnabled ? 'black' : 'white'}
      type={'h4'}
      style={[styles.listText, item.done ? { textDecorationLine: 'line-through', color: '#878787' } : null]}
      onPress={() => {
        onPress({ message: item.value });
        setEditable(true);
      }}
      onLongPress={() =>
        ActionSheet.show(
          {
            options: [`mark as ${item.done ? 'undone' : 'done'}`, 'delete', 'Cancel'],
            cancelButtonIndex: 2,
            title: `I want item: '${item.value}' to:`,
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                dispatch(addHistory());
                dispatch(markItem(item.value));
                break;
              case 1:
                dispatch(addHistory());
                dispatch(deleteItem(item.value));
                break;
            }
          },
        )
      }>
      {item.value}
    </Typography>
  );
};

export default React.memo(ItemsListText);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listText: {
    width: '100%',
  },
  textInput: {
    width: '100%',
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
  },
});
