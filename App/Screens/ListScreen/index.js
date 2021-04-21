import React, { useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

import ButtonElement from '../../Components/ButtonElement';
import ItemsList from '../../Components/ItemsList';
import Input from '../../Components/Input';

import {addItem, loadItems, downloadItems, saveItems, uploadItems, showError, interaction} from '../../redux/actions/index';

import styles from './styles';
import globalStyles from '../../Styles';

const listScreen = (props) => {
  const [text, setText] = useState('');

  const textInputHandler = (text) => {
    setText(text);
  }

  return (
    <View style={[styles.container, globalStyles.background]}>
      <Input
        text={text}
        textInputHandler={textInputHandler}
        placeholder='type here to add item'
        onFocus ={() => props.interaction('input')}
      />

      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Add"
          onPress={() => {
            try {
              props.addItem(text);
              setText('');
              props.interaction('Add button')
            } catch (err) {
              props.showError(err);
            }
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title={"Save"}
          onPress={() => {
            props.saveItems(props.items)
            props.interaction('Save button')
          }}
        />
        <ButtonElement
          title={"Load"}
          onPress={() => {
            props.loadItems()
            props.interaction('Load button')
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title={"Upload"}
          onPress={() => {
            props.uploadItems(props.items)
            props.interaction('Upload button')
          }}
        />
        <ButtonElement
          title={"Download"}
          onPress={() => {
            props.downloadItems()
            props.interaction('Download button')
          }}
        />
      </View>

      <ItemsList />
    </View>
  );
}

const mapStateToProps = (state) => {
    return {items: state.items};
};

export default connect(
    mapStateToProps, 
    {
      addItem: addItem,
      loadItems: loadItems,
      downloadItems: downloadItems,
      saveItems: saveItems,
      uploadItems: uploadItems,
      showError: showError,
      interaction: interaction,
    }
)(listScreen);