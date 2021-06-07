import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import ItemsListText from '../ItemsListText';
import { RootState, Items } from '../../Helpers/Types';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

type ItemsListProps = {
  items?: Items;
  onPress: () => void;
};

const ItemsList: React.FC<ItemsListProps> = ({ items, onPress }) => {
  const isLightThemeEnabled = useSelector(({isLightThemeEnabled}: RootState) => isLightThemeEnabled);
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  return (
    <View style={[styles.listContainer, globalStyles.background]}>
      <FlatList
        removeClippedSubviews={false}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        ItemSeparatorComponent={() => (
          <View style={[{ borderBottomColor: isLightThemeEnabled ? 'black' : 'white' }, styles.listSeparator]} />
        )}
        data={items}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>- </Text>
            <ItemsListText item={item} onPress={onPress} />
          </View>
        )}
      />
    </View>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 20,
  },
  list: {
    width: '100%',
    paddingLeft: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 30,
  },
  listSeparator: {
    width: '95%',
    borderBottomWidth: 1,
  },
});
