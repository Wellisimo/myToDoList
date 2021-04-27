import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { ActionSheet } from "native-base";
import {connect} from 'react-redux';

import {markItem, deleteItem, interaction, updateItem, addHistory} from '../../redux/actions';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const itemsListText = (props) => {
  useEffect(() => {
    // console.log(`List item ${props.item.value} rendered`);
    if (input.current && !input.current.isFocused()){
      setText(props.item.value);
    }
  })

  const [text, setText] = useState(props.item.value)
  const [editable, setEditable] = useState(false);
  const input = useRef(null);
  const globalStyles = props.style ? globalStylesWhite : globalStylesDark;

  return (
    editable 
      ? (
        <TextInput
          ref={input}
          style={[styles.textInput, globalStyles.mainText, props.item.done ? {textDecorationLine: 'line-through', color: '#878787'} : null]}
          value={text}
          editable={editable}
          onEndEditing={() => {
            setEditable(false);
          }}
          onSubmitEditing={() => {
            props.addHistory(props.items);
            props.updateItem(props.item.value, text);
          }}
          onChangeText={setText}
          onLayout={() => input.current.focus()}
        />
      ) : (
        <Text
          style={[styles.listText, globalStyles.mainText, props.item.done ? {textDecorationLine: 'line-through', color: '#878787'} : null]}
          onPress={() => {
            // props.interaction(`List item ${props.item.value}`)
            props.callBack(`List item ${props.item.value}`)
            setEditable(true);
          }}
          onLongPress={() => ActionSheet.show(
            {
              options: [`mark as ${props.item.done ? 'undone' : 'done'}`, 'delete', 'Cancle'],
              cancelButtonIndex: 2,
              title: `I want item: '${props.item.value}' to:` 
            },
            buttonIndex => {
              switch (buttonIndex) {
                case 0:
                  props.addHistory(props.items);
                  props.markItem(props.item.value);
                  break;
                case 1:
                  props.addHistory(props.items);
                  props.deleteItem(props.item.value);
                  break;
              }
            }
          )}
        >
          {props.item.value}
        </Text>
      )
  )
}

const mapStateToProps = (state) => {
    return {
      items: state.items,
      style: state.style,
    };
};

export default connect(
  mapStateToProps, 
  {
    markItem: markItem,
    deleteItem: deleteItem,
    interaction: interaction,
    updateItem: updateItem,
    addHistory: addHistory,
  }
)(itemsListText);

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  listText: {
    padding: 2,
    width: '100%',
  },
  textInput: {
    width: '100%',
  },
});