import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import { useAppSelector } from '../../redux/useAppSelector';
import ButtonElement from '../../Components/ButtonElement';
import ItemsList from '../../Components/ItemsList';
import Input from '../../Components/Input';
import { black } from '../../Constants/Colors';
import { white } from '../../Constants/Colors';

import {
  addItem,
  loadItems,
  downloadItems,
  saveItems,
  uploadItems,
  clearItems,
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
          element.value.toLowerCase().includes(text.toLowerCase())
        ) {
          return true;
        }
      });
    }

    // filtering done AND undone items together
    return items?.filter(element => element.value.toLowerCase().includes(text.toLowerCase()));
  }, [conditionalShow, items, text]);

  return (
    <View style={[styles.container, globalStyles.background]}>
      <View style={styles.row}>
        <Input
          text={text}
          textInputHandler={textInputHandler}
          placeholder="type here to add or search item"
          onFocus={navigation.setParams}
        />
        {text ?
          <TouchableOpacity style={styles.iconContainer} onPress={() => setText('')}>
            <Entypo name="cross" size={24} color={black} />
          </TouchableOpacity>
          : null}
      </View>

      <View style={styles.row}>
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
      <View style={styles.row}>
        <ButtonElement
          title={
            conditionalShow === conditional.All
              ? 'Filter: all'
              : conditionalShow === conditional.Done
                ? 'Filter: done'
                : 'Filter: todo'
          }
          onPress={() => {
            navigation.setParams({
              message:
                conditionalShow === conditional.All
                  ? 'Filter: all'
                  : conditionalShow === conditional.Done
                    ? 'Filter: done'
                    : 'Filter: todo',
            });
            toggleShow();
          }}
        />
        <ButtonElement
          title={'Clear All'}
          onPress={() => {
            navigation.setParams({ message: 'Clear All' });
            dispatch(addUserActionHistory());
            dispatch(clearItems());
          }}
        />
      </View>
      <View style={styles.row}>
        <ButtonElement
          title="Save (local)"
          onPress={() => {
            navigation.setParams({ message: 'Save' });
            items && dispatch(saveItems(items));
          }}
        />
        <ButtonElement
          title="Load (local)"
          onPress={() => {
            navigation.setParams({ message: 'Load' });
            dispatch(addUserActionHistory());
            dispatch(loadItems());
          }}
        />
      </View>
      <View style={styles.row}>
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
