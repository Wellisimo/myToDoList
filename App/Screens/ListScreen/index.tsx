import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../Helpers/Types';
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

type ListScreenProps = {
  navigation: {
    [key: string]: (arg?: any) => void;
  };
}

const ListScreen: React.FC<ListScreenProps> = ({navigation}) => {
  const [text, setText] = useState('');
  const [conditionalShow, setConditionalShow] = useState('All');
  const [showItems, setShowItems] = useState([]);
  const [enableSearch, setEnableSearch] = useState(false);

  const isLightThemeEnabled = useSelector(({isLightThemeEnabled}: RootState) => isLightThemeEnabled);
  const items = useSelector(({items}: RootState) => items);
  const history = useSelector(({history}: RootState) => history);

  const dispatch = useDispatch();
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  const textInputHandler = (text: string) => {
    setText(text);
  };
  console.log('private');
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
      setShowItems((): any =>
        items?.filter(element => {
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
      setShowItems((): any => 
        enableSearch ? items?.filter(element => element.value.toLowerCase().includes(text.toLowerCase())) : items,
      );
    }
  }, [conditionalShow, enableSearch, items, text]);

  return (
    <View style={[styles.container, globalStyles.background]}>
      <Input
        text={text}
        textInputHandler={textInputHandler}
        placeholder="type here to add or search item"
        onFocus={navigation.setParams}
      />

      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Add"
          onPress={() => {
            navigation.setParams({ message: 'Add' });
            dispatch(addHistory());
            dispatch(addItem(text));
            setText('');
          }}
        />
        <ButtonElement
          title="Undo"
          onPress={() => {
            navigation.setParams({ message: 'Undo' });
            dispatch(undoItems(history));
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title={conditionalShow === 'All' ? 'Show done' : conditionalShow === 'Done' ? 'Show todo' : 'Show all'}
          onPress={() => {
            navigation.setParams({
              message: conditionalShow === 'All' ? 'Show done' : conditionalShow === 'Done' ? 'Show todo' : 'Show all',
            });
            toggleShow();
          }}
        />
        <ButtonElement
          title={!enableSearch ? 'Enable Search' : 'Stop Search'}
          onPress={() => {
            navigation.setParams({ message: 'Search' });
            setEnableSearch(!enableSearch);
            enableSearch ? setText('') : null;
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Save"
          onPress={() => {
            navigation.setParams({ message: 'Save' });
            dispatch(saveItems(items));
          }}
        />
        <ButtonElement
          title="Load"
          onPress={() => {
            navigation.setParams({ message: 'Load' });
            dispatch(addHistory());
            dispatch(loadItems());
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Upload"
          onPress={() => {
            navigation.setParams({ message: 'Upload' });
            dispatch(uploadItems(items));
          }}
        />
        <ButtonElement
          title="Download"
          onPress={() => {
            navigation.setParams({ message: 'Download' });
            dispatch(addHistory());
            dispatch(downloadItems());
          }}
        />
      </View>

      <ItemsList onPress={navigation.setParams} items={showItems} />
    </View>
  );
};

export default ListScreen;
