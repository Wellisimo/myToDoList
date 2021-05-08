import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ButtonElement from '../../Components/ButtonElement';
import ItemsList from '../../Components/ItemsList';
import Input from '../../Components/Input';

import {
  addItem,
  loadItems,
  downloadItems,
  saveItems,
  uploadItems,
  addHistory,
  undoItems,
  showError,
  getStyle,
} from '../../redux/actions/index';

import styles from './styles';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const listScreen = props => {
  const [text, setText] = useState('');
  const items = useSelector(state => state.items);
  const style = useSelector(state => state.style);
  const history = useSelector(state => state.history);

  const dispatch = useDispatch();
  const globalStyles = style ? globalStylesWhite : globalStylesDark;

  const textInputHandler = text => {
    setText(text);
  };

  useEffect(() => {
    dispatch(getStyle());
  }, []);

  return (
    <View style={[styles.container, globalStyles.background]}>
      <Input
        text={text}
        textInputHandler={textInputHandler}
        placeholder="type here to add item"
        onFocus={() => {
          props.route.params.callBack('input');
        }}
      />

      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Add"
          onPress={() => {
            try {
              dispatch(addItem(text));
              dispatch(addHistory(items));
              setText('');
              props.route.params.callBack('Add button');
            } catch (err) {
              dispatch(showError(err));
            }
          }}
        />
        <ButtonElement
          title="Undo"
          onPress={() => {
            dispatch(undoItems(history));
            props.route.params.callBack('Undo button');
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Save"
          onPress={() => {
            dispatch(saveItems(items));
            props.route.params.callBack('Save button');
          }}
        />
        <ButtonElement
          title="Load"
          onPress={() => {
            dispatch(loadItems());
            dispatch(addHistory(items));
            props.route.params.callBack('Load button');
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Upload"
          onPress={() => {
            dispatch(uploadItems(items));
            props.route.params.callBack('Upload button');
          }}
        />
        <ButtonElement
          title="Download"
          onPress={() => {
            dispatch(downloadItems());
            dispatch(addHistory(items));
            props.route.params.callBack('Download button');
          }}
        />
      </View>

      <ItemsList callBack={props.route.params.callBack} />
    </View>
  );
};

export default listScreen;
