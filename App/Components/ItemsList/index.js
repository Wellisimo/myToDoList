import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import ItemsListText from '../ItemsListText';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const itemsList = props => {
  const isLightThemeEnabled = useSelector(state => state.isLightThemeEnabled);
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
        data={props.items}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>- </Text>
            <ItemsListText item={item} onPress={props.onPress} />
          </View>
        )}
      />
    </View>
  );
};

export default itemsList;

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
