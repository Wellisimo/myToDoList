import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ActionSheet } from 'native-base';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/useAppSelector';

import { markItem, deleteItem, updateItem, addUserActionHistory } from '../../redux/actions';
import { ItemObject } from '../../Helpers/Types';
import Typography from '../Typography';
import { black } from '../../Constants/Colors';
import { white } from '../../Constants/Colors';
import { grey } from '../../Constants/Colors';

type ItemsListTextProps = {
  item: ItemObject;
  onPress: (arg: { message: string }) => void;
};

const ItemsListText: React.FC<ItemsListTextProps> = ({ item, onPress }) => {
  const [text, setText] = useState(item.value);
  const [editable, setEditable] = useState(false);
  const input = useRef<TextInput>(null);

  const isLightThemeEnabled = useAppSelector(({ isLightThemeEnabled }) => isLightThemeEnabled);
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
        { color: isLightThemeEnabled ? black : white },
        item.done ? { textDecorationLine: 'line-through', color: grey } : null,
      ]}
      value={text}
      editable={editable}
      onEndEditing={() => {
        setEditable(false);
      }}
      onSubmitEditing={() => {
        dispatch(addUserActionHistory());
        dispatch(updateItem(item.value, text));
      }}
      onChangeText={setText}
      onLayout={() => input.current && input.current.focus()}
    />
  ) : (
    <Typography
      type={'h4'}
      darkModeEnabled={!isLightThemeEnabled}
      numberOfLines={1}
      style={[styles.listText, item.done ? { textDecorationLine: 'line-through', color: grey } : null]}
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
                dispatch(addUserActionHistory());
                dispatch(markItem(item.value));
                break;
              case 1:
                dispatch(addUserActionHistory());
                dispatch(deleteItem(item.value));
                break;
            }
          },
        )
      }>
      {`- ${item.value}`}
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
