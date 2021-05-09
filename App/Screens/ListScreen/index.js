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
  const isLightThemeEnabled = useSelector(state => state.isLightThemeEnabled);
  const items = useSelector(state => state.items);
  const history = useSelector(state => state.history);

  const dispatch = useDispatch();
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

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
        onFocus={props.navigation.setParams}
      />

      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Add"
          onPress={() => {
            try {
              props.navigation.setParams({ message: 'Add' });
              dispatch(addItem(text));
              dispatch(addHistory(items));
              setText('');
            } catch (err) {
              dispatch(showError(err.message));
            }
          }}
        />
        <ButtonElement
          title="Undo"
          onPress={() => {
            props.navigation.setParams({ message: 'Undo' });
            dispatch(undoItems(history));
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Save"
          onPress={() => {
            props.navigation.setParams({ message: 'Save' });
            dispatch(saveItems(items));
          }}
        />
        <ButtonElement
          title="Load"
          onPress={() => {
            props.navigation.setParams({ message: 'Load' });
            dispatch(loadItems());
            dispatch(addHistory());
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Upload"
          onPress={() => {
            props.navigation.setParams({ message: 'Upload' });
            dispatch(uploadItems(items));
          }}
        />
        <ButtonElement
          title="Download"
          onPress={() => {
            props.navigation.setParams({ message: 'Download' });
            dispatch(downloadItems());
            dispatch(addHistory());
          }}
        />
      </View>

      <ItemsList onPress={props.navigation.setParams} />
    </View>
  );
};

export default listScreen;
