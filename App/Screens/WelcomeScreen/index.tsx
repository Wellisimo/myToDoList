import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Typography from '../../Components/Typography';
import styles from './styles';

type WelcomeScreenProps = {
  navigation: {
    [key: string]: (arg?: any) => any;
  };
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Typography type={'h2'} paddingBottom={50}>
      Welcome to my ToDo List
    </Typography>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
      <Typography type={'h4'}>Login</Typography>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
      <Typography type={'h4'}>Register</Typography>
    </TouchableOpacity>
  </View>
);

export default WelcomeScreen;
