import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import styles from './styles';

import { UserNotFound } from '../../Errors';
import { showError, login } from '../../redux/actions/index';

const URL = 'https://mytodolist-d5e1a-default-rtdb.europe-west1.firebasedatabase.app';

const loginScreen = () => {
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const isUserLoginValid = async (login, password) => {
    try {
      const result = await fetch(`${URL}/users.json`);
      const jsonResult = await result.json();
      if (jsonResult) {
        return !!Object.values(jsonResult).find(
          element => element.login === userLogin && element.password === password,
        );
      }
      throw new UserNotFound('please register any user first');
    } catch (err) {
      dispatch(showError(`Error ${err.name}: ${err.message}`));
    }
  };

  const handleLogin = async () => {
    if (!userLogin || !password) {
      dispatch(showError('No login or password entered'));
      return;
    }

    const loginGood = await isUserLoginValid(userLogin, password);

    if (loginGood) {
      const jsonValue = JSON.stringify(true);
      await AsyncStorage.setItem('isLogged', jsonValue);
      setUserLogin('');
      setPassword('');
      dispatch(login());
    } else {
      setUserLogin('');
      setPassword('');
      dispatch(showError('Login or password is incorrect'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 20, fontWeight: '600', paddingBottom: 50 }]}>Enter your data</Text>
      <TextInput
        style={styles.textInput}
        value={userLogin}
        onChangeText={setUserLogin}
        placeholder="login"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        autoCapitalize="none"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default loginScreen;
