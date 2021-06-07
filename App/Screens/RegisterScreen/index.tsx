import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from './styles';

import { showError } from '../../redux/actions/index';

type RegisterScreenProps = {
  navigation: {
    [key: string]: (arg?: any) => void;
  };
}

const URL = 'https://mytodolist-d5e1a-default-rtdb.europe-west1.firebasedatabase.app';

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginProcess, setLoginProcess] = useState(false);
  const dispatch = useDispatch();

  const isUserLoginTaken = async (): Promise<boolean> => {
    const result = await fetch(`${URL}/users.json`);
    const jsonResult = await result.json();
    return !!Object.values(jsonResult || {}).find((element: any) => element.login === login);
  };

  const handleRegister = async (): Promise<void> => {
    const userData = { login, password };

    if (!login || !password) {
      dispatch(showError('No login or password entered'));
      return;
    }
    const loginTaken = await isUserLoginTaken();

    if (loginTaken) {
      dispatch(showError('Login is already taken'));
    } else {
      setLoginProcess(true);
      fetch(`${URL}/users.json`, {
        method: 'POST',
        body: JSON.stringify(userData),
      }).then(response => {
        if (response.ok) {
          setLogin('');
          setPassword('');
          dispatch(showError('Registration successful! Redirecting to login menu'));
          setTimeout(() => {
            dispatch(showError(''));
            setLoginProcess(false);
            navigation.navigate('Login');
          }, 2000);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {loginProcess ? (
        <ActivityIndicator style={{ position: 'absolute', top: '25%' }} size="large" color="black" />
      ) : null}
      <Text style={[styles.text, { fontSize: 20, fontWeight: '600', paddingBottom: 50 }]}>Chose your data</Text>
      <TextInput
        style={styles.textInput}
        value={login}
        onChangeText={setLogin}
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;