import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { Entypo, Fontisto } from '@expo/vector-icons';

import { logout, changeStyle } from '../../redux/actions';
import { RootState } from '../../Helpers/Types';
import Typography from '../Text';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

type HeaderProps = {
  message?: string;
}

const Header: React.FC<HeaderProps> = ({message}) => {
  const [text, setText] = useState('press something');

  const isLightThemeEnabled = useSelector(({isLightThemeEnabled}: RootState) => isLightThemeEnabled);
  const dispatch = useDispatch();
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  const logOutHandler = async (): Promise<void> => {
    const jsonValue = JSON.stringify(false);
    await AsyncStorage.setItem('isLogged', jsonValue);
    dispatch(logout());
  };

  useEffect(() => {
    message && setText(message);
  }, [message]);

  return (
    <View
      style={[
        {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        },
        ,
        globalStyles.navigationHeader,
      ]}>
      <TouchableOpacity
        style={{
          width: '20%',
          height: 60,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}
        onPress={() => dispatch(changeStyle())}>
        {isLightThemeEnabled ? (
          <Entypo name="moon" size={24} color="black" style={{ paddingBottom: 10, paddingLeft: 20 }} />
        ) : (
          <Fontisto name="sun" size={24} color="white" style={{ paddingBottom: 10, paddingLeft: 20 }} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '60%',
          height: 60,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        onPress={logOutHandler}>
        <Typography type={'h4'} color={isLightThemeEnabled ? 'black' : 'white'} paddingBottom={10}>
          Log Out
        </Typography>
      </TouchableOpacity>

      <Typography color={isLightThemeEnabled ? 'black' : 'white'} type={'h6'} paddingTop={15} style={{ width: '20%' }}>
        Last pressed: {text}
      </Typography>
    </View>
  );
};

export default Header;