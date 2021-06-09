import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import Typography from '../../Components/Typography';
import styles from './styles';
import { URL } from '../../Constants/URL';
import { UserNotFound } from '../../Errors';
import { showError, login } from '../../redux/actions/index';

const LoginScreen = () => {
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // imitating login check (no real back-end actions)
  const isUserLoginValid = async (userLogin: string, password: string): Promise<boolean | undefined> => {
    try {
      const result = await fetch(`${URL}/users.json`);
      const jsonResult = await result.json();
      if (jsonResult) {
        // donwloading all aviable logins and passwords to find if entered is valid
        return !!Object.values(jsonResult).find(
          (element: any) => element.login === userLogin && element.password === password,
        );
      }
      throw new (UserNotFound('please register any user first') as any)();
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
      <Typography type={'h2'} paddingBottom={50} style={styles.text}>
        Enter your data
      </Typography>
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
        <Typography type={'h4'} style={styles.text}>
          Login
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
