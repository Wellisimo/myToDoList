import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import {connect} from 'react-redux';

import ItemListText from '../ItemsListText';

const itemsList = (props) => {
    return (
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
            ItemSeparatorComponent={() => <View style={styles.listSeparator}/>}
            data={props.items}
            renderItem={({item}) => {
              return (
                <View style={styles.listItem}>
                  <Text>- </Text>
                  <ItemListText 
                    item={item}
                  />
                </View>
              )
            }}
          />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {items: state.items};
};

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
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});