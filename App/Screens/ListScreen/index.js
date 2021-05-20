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
  getStyle,
} from '../../redux/actions/index';

import styles from './styles';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const listScreen = props => {
  const [text, setText] = useState('');
  const [conditionalShow, setConditionalShow] = useState('All');
  const [showItems, setShowItems] = useState([]);
  const [enableSearch, setEnableSearch] = useState(false);

  const isLightThemeEnabled = useSelector(state => state.isLightThemeEnabled);
  const items = useSelector(state => state.items);
  const history = useSelector(state => state.history);

  const dispatch = useDispatch();
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  const textInputHandler = text => {
    setText(text);
  };

  const toggleShow = () => {
    if (conditionalShow === 'All') {
      setConditionalShow('Done');
    }
    if (conditionalShow === 'Done') {
      setConditionalShow('Undone');
    }
    if (conditionalShow === 'Undone') {
      setConditionalShow('All');
    }
  };

  // check for style theme
  useEffect(() => {
    dispatch(getStyle());
  }, []);

  // conditional rendering of items list
  useEffect(() => {
    if (conditionalShow !== 'All') {
      setShowItems(() =>
        items.filter(element => {
          if (
            element.done === (conditionalShow === 'Done' ? true : false) &&
            (enableSearch ? element.value.toLowerCase().includes(text.toLowerCase()) : true)
          ) {
            return true;
          }
        }),
      );
    }
    if (conditionalShow === 'All') {
      setShowItems(
        enableSearch ? items.filter(element => element.value.toLowerCase().includes(text.toLowerCase())) : items,
      );
    }
  }, [conditionalShow, enableSearch, items, text]);

  return (
    <View style={[styles.container, globalStyles.background]}>
      <Input
        text={text}
        textInputHandler={textInputHandler}
        placeholder="type here to add or search item"
        onFocus={props.navigation.setParams}
      />

      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Add"
          onPress={() => {
            props.navigation.setParams({ message: 'Add' });
            dispatch(addHistory());
            dispatch(addItem(text));
            setText('');
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
          title={conditionalShow === 'All' ? 'Show done' : conditionalShow === 'Done' ? 'Show todo' : 'Show all'}
          onPress={() => {
            props.navigation.setParams({
              message: conditionalShow === 'All' ? 'Show done' : conditionalShow === 'Done' ? 'Show todo' : 'Show all',
            });
            toggleShow();
          }}
        />
        <ButtonElement
          title={!enableSearch ? 'Enable Search' : 'Stop Search'}
          onPress={() => {
            props.navigation.setParams({ message: 'Search' });
            setEnableSearch(!enableSearch);
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
            dispatch(addHistory());
            dispatch(loadItems());
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
            dispatch(addHistory());
            dispatch(downloadItems());
          }}
        />
      </View>

      <ItemsList onPress={props.navigation.setParams} items={showItems} />
    </View>
  );
};

export default listScreen;
