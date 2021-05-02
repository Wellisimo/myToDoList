import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import ButtonElement from '../../Components/ButtonElement';
import ItemsList from '../../Components/ItemsList';
import Input from '../../Components/Input';

import {
  addItem, loadItems, downloadItems, saveItems, uploadItems, addHistory, undoItems, showError, interaction, getStyle,
} from '../../redux/actions/index';

import styles from './styles';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const listScreen = (props) => {
  const [text, setText] = useState('');
  const globalStyles = props.style ? globalStylesWhite : globalStylesDark;

  const textInputHandler = (text) => {
    setText(text);
  };

  useEffect(() => { props.getStyle(); }, []);

  return (
    <View style={[styles.container, globalStyles.background]}>
      <Input
        text={text}
        textInputHandler={textInputHandler}
        placeholder="type here to add item"
        onFocus={() => {
          // props.interaction('input');
          props.route.params.callBack('input');
        }}
      />

      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Add"
          onPress={() => {
            try {
              props.addItem(text);
              props.addHistory(props.items);
              setText('');
              // props.interaction('Add button');
              props.route.params.callBack('Add button');
            } catch (err) {
              props.showError(err);
            }
          }}
        />
        <ButtonElement
          title="Undo"
          onPress={() => {
            props.undoItems(props.history);
            // props.interaction('Save button');
            props.route.params.callBack('Undo button');
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Save"
          onPress={() => {
            props.saveItems(props.items);
            // props.interaction('Save button');
            props.route.params.callBack('Save button');
          }}
        />
        <ButtonElement
          title="Load"
          onPress={() => {
            props.loadItems();
            props.addHistory(props.items);
            // props.interaction('Load button');
            props.route.params.callBack('Load button');
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Upload"
          onPress={() => {
            props.uploadItems(props.items);
            // props.interaction('Upload button')
            props.route.params.callBack('Upload button');
          }}
        />
        <ButtonElement
          title="Download"
          onPress={() => {
            props.downloadItems();
            props.addHistory(props.items);
            // props.interaction('Download button')
            props.route.params.callBack('Download button');
          }}
        />
      </View>

      <ItemsList
        callBack={props.route.params.callBack}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
  history: state.history,
  style: state.style,
});

export default connect(
  mapStateToProps,
  {
    addItem,
    loadItems,
    downloadItems,
    saveItems,
    uploadItems,
    showError,
    interaction,
    undoItems,
    undoItems,
    addHistory,
    getStyle,
  },
)(listScreen);
