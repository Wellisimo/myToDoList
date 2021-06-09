import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { useAppSelector } from '../../redux/useAppSelector';
import ItemsListText from '../ItemsListText';
import { Items } from '../../Helpers/Types';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';
import { black } from '../../Constants/Colors';
import { white } from '../../Constants/Colors';

type ItemsListProps = {
  items?: Items;
  onPress: () => void;
};

const ItemsList: React.FC<ItemsListProps> = ({ items, onPress }) => {
  const isLightThemeEnabled = useAppSelector(({ isLightThemeEnabled }) => isLightThemeEnabled);
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  return (
    <View style={[styles.listContainer, globalStyles.background]}>
      <FlatList
        removeClippedSubviews={false}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        ItemSeparatorComponent={() => (
          <View style={[{ borderBottomColor: isLightThemeEnabled ? black : white }, styles.listSeparator]} />
        )}
        data={items}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
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
    alignSelf: 'flex-end',
    marginRight: '4%',
  },
});
