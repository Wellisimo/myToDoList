import React from 'react';
import {
  StyleSheet, View, FlatList, Text,
} from 'react-native';
import { connect } from 'react-redux';

import ItemsListText from '../ItemsListText';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const itemsList = (props) => {
  const globalStyles = props.style ? globalStylesWhite : globalStylesDark;

  return (
    <View style={[styles.listContainer, globalStyles.background]}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={[{ borderBottomColor: props.style ? 'black' : 'white' }, styles.listSeparator]} />}
        data={props.items}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>- </Text>
            <ItemsListText
              item={item}
              callBack={props.callBack}
            />
          </View>
        )}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
  history: state.history,
  style: state.style,
});

export default connect(mapStateToProps)(itemsList);

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
