import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../redux/useAppSelector';
import ButtonElement from '../../Components/ButtonElement';
import ItemsList from '../../Components/ItemsList';
import Input from '../../Components/Input';

import {
  addItem,
  loadItems,
  downloadItems,
  saveItems,
  uploadItems,
  addUserActionHistory,
  undoUserAction,
  getStyle,
} from '../../redux/actions/index';

import styles from './styles';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';
import Typography from '../../Components/Typography';

type ListScreenProps = {
  navigation: {
    [key: string]: (arg?: any) => void;
  };
};

enum conditional {
  All = 'ALL',
  Done = 'DONE',
  Undone = 'UNDONE',
}

const ListScreen: React.FC<ListScreenProps> = ({ navigation }) => {
  const [text, setText] = useState('');
  const [conditionalShow, setConditionalShow] = useState(conditional.All);
  const [enableSearch, setEnableSearch] = useState(false);

  const isLightThemeEnabled = useAppSelector(({ isLightThemeEnabled }) => isLightThemeEnabled);
  const items = useAppSelector(({ items }) => items);
  const history = useAppSelector(({ history }) => history);

  const dispatch = useDispatch();
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  const textInputHandler = (text: string) => {
    setText(text);
  };

  const toggleShow = () => {
    if (conditionalShow === conditional.All) {
      setConditionalShow(conditional.Done);
    }
    if (conditionalShow === conditional.Done) {
      setConditionalShow(conditional.Undone);
    }
    if (conditionalShow === conditional.Undone) {
      setConditionalShow(conditional.All);
    }
  };

  // check for style theme
  useEffect(() => {
    dispatch(getStyle());
  }, []);

  // conditional rendering of items list
  const showItems = useMemo(() => {
    // toggle between done OR undone items
    if (conditionalShow !== conditional.All) {
      // filtering done OR undone items
      return items?.filter(element => {
        if (
          element.done === (conditionalShow === conditional.Done) &&
          (enableSearch ? element.value.toLowerCase().includes(text.toLowerCase()) : true)
        ) {
          return true;
        }
      });
    }

    // filtering done AND undone items together
    return enableSearch ? items?.filter(element => element.value.toLowerCase().includes(text.toLowerCase())) : items;
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
            dispatch(addUserActionHistory());
            dispatch(addItem(text));
            setText('');
          }}
        />
        <ButtonElement
          title="Undo"
          onPress={() => {
            navigation.setParams({ message: 'Undo' });
            history && dispatch(undoUserAction(history));
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title={
            conditionalShow === conditional.All
              ? 'Show done'
              : conditionalShow === conditional.Done
              ? 'Show todo'
              : 'Show all'
          }
          onPress={() => {
            navigation.setParams({
              message:
                conditionalShow === conditional.All
                  ? 'Show done'
                  : conditionalShow === conditional.Done
                  ? 'Show todo'
                  : 'Show all',
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
            items && dispatch(saveItems(items));
          }}
        />
        <ButtonElement
          title="Load"
          onPress={() => {
            navigation.setParams({ message: 'Load' });
            dispatch(addUserActionHistory());
            dispatch(loadItems());
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title="Upload"
          onPress={() => {
            navigation.setParams({ message: 'Upload' });
            items && dispatch(uploadItems(items));
          }}
        />
        <ButtonElement
          title="Download"
          onPress={() => {
            navigation.setParams({ message: 'Download' });
            dispatch(addUserActionHistory());
            dispatch(downloadItems());
          }}
        />
      </View>

      <Typography type={'h7'} darkModeEnabled={!isLightThemeEnabled} marginTop={10}>
        {showItems && showItems.length > 0 ? 'Press on item to edit; Press and hold item to get more actions' : null}
      </Typography>

      <ItemsList onPress={navigation.setParams} items={showItems} />
    </View>
  );
};

export default ListScreen;
