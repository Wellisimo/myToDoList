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
      <Input text={text} textInputHandler={textInputHandler} placeholder="type here to add item" onFocus={() => {}} />

      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Add"
          onPress={() => {
            try {
              dispatch(addItem(text));
              dispatch(addHistory(items));
              setText('');
            } catch (err) {
              dispatch(showError(err));
            }
          }}
        />
        <ButtonElement
          title="Undo"
          onPress={() => {
            dispatch(undoItems(history));
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Save"
          onPress={() => {
            dispatch(saveItems(items));
          }}
        />
        <ButtonElement
          title="Load"
          onPress={() => {
            dispatch(loadItems());
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Upload"
          onPress={() => {
            dispatch(uploadItems(items));
          }}
        />
        <ButtonElement
          title="Download"
          onPress={() => {
            dispatch(downloadItems());
            dispatch(addHistory(items));
          }}
        />
      </View>

      <ItemsList />
    </View>
  );
};

export default listScreen;
