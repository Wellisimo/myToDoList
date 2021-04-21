import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ActionSheet } from "native-base";
import {connect} from 'react-redux';

import {markItem, deleteItem, interaction} from '../../redux/actions';

import globalStyles from '../../Styles';

const itemListText = (props) => {
  return (
    <Text
      style={props.item.done ? [styles.listText, globalStyles.mainText, {textDecorationLine: 'line-through', color: '#CBD4CF'}] : [styles.listText, globalStyles.mainText]}
      onPress={() => props.interaction(`List item ${props.item.value}`)}
      onLongPress={() => ActionSheet.show(
        {
          options: [`mark as ${props.item.done ? 'undone' : 'done'}`, 'delete', 'Cancle'],
          cancelButtonIndex: 2,
          title: `I want item: '${props.item.value}' to:` 
        },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              props.markItem(props.item.value)
              break;
            case 1:
              props.deleteItem(props.item.value)
              break;
          }
        }
      )}
    >
      {props.item.value}
    </Text>
  )
}

export default connect(
  null, 
  {
    markItem: markItem,
    deleteItem: deleteItem,
    interaction: interaction,
  }
)(itemListText);

const styles = StyleSheet.create({
  listText: {
    padding: 2,
    width: '100%',
  },
});