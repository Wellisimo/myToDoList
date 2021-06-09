import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import Typography from '../../Components/Typography';
import styles from './styles';
import { URL } from '../../Constants/URL';
import { showError } from '../../redux/actions/index';

type RegisterScreenProps = {
  navigation: {
    [key: string]: (arg?: any) => void;
  };
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // get all user logins to check if new one is taken
  const isUserLoginTaken = async () => {
    const allUserLogins = await fetch(`${URL}/users.json`);
    const jsonAllUserLogins = await allUserLogins.json();
    return !!Object.values(jsonAllUserLogins || {}).find((element: any) => element.login === login);
  };

  const handleRegister = async () => {
    const userData = { login, password };

    if (!login || !password) {
      dispatch(showError('No login or password entered'));
      return;
    }
    const loginTaken = await isUserLoginTaken();

    if (loginTaken) {
      dispatch(showError('Login is already taken'));
    } else {
      setLoading(true);
      const registerNewUser = await fetch(`${URL}/users.json`, {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      // clear fields and redirect if register is successfull
      if (registerNewUser.ok) {
        setLogin('');
        setPassword('');
        dispatch(showError('Registration successful! Redirecting to login menu'));

        // imitate bad connection to check ActivityIndicator
        setTimeout(() => {
          dispatch(showError(''));
          setLoading(false);
          navigation.navigate('Login');
        }, 1500);
      }
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator style={{ position: 'absolute', top: '25%' }} size="large" color="black" />}
      <Typography type={'h2'} paddingBottom={50} style={styles.text}>
        Chose your data
      </Typography>
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
        <Typography type={'h4'} style={styles.text}>
          Register
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
