import React from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { showError } from '../../redux/actions/index';

const modalError = () => {
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  return error ? (
    <Modal animationType="slide" transparent visible>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => dispatch(showError(''))}
          style={{
            margin: 10,
            backgroundColor: '#9cb6b8',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 10,
          }}>
          <Text>{error}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  ) : null;
};

export default modalError;
