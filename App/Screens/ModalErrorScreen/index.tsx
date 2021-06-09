import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';

import { useDispatch } from 'react-redux';
import { showError } from '../../redux/actions/index';

import Typography from '../../Components/Typography';
import styles from './styles';
import { useAppSelector } from '../../redux/useAppSelector';

const ModalError = () => {
  const error = useAppSelector(({ error }) => error);
  const dispatch = useDispatch();

  if (!error) return null;

  return (
    <Modal animationType="slide" transparent visible>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => dispatch(showError(''))} style={styles.body}>
          <Typography type={'h4'}>{error}</Typography>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalError;
