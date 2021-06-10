import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { Entypo, Fontisto } from '@expo/vector-icons';

import { logout, changeStyle } from '../../redux/actions';
import { useAppSelector } from '../../redux/useAppSelector';
import Typography from '../Typography';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';
import { black } from '../../Constants/Colors';
import { white } from '../../Constants/Colors';
import SafePadding from '../../Helpers/ScreenDimensions';

type HeaderProps = {
  message?: string;
};

const Header: React.FC<HeaderProps> = ({ message }) => {
  const [text, setText] = useState('press something');

  const isLightThemeEnabled = useAppSelector(({ isLightThemeEnabled }) => isLightThemeEnabled);
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
    <View style={[styles.container, globalStyles.navigationHeader]}>
      <TouchableOpacity style={styles.left} onPress={() => dispatch(changeStyle())}>
        {isLightThemeEnabled ? (
          <Entypo name="moon" size={24} color={black} style={styles.icon} />
        ) : (
          <Fontisto name="sun" size={24} color={white} style={styles.icon} />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.middle} onPress={logOutHandler}>
        <Typography type={'h4'} darkModeEnabled={!isLightThemeEnabled} paddingBottom={10}>
          Log Out
        </Typography>
      </TouchableOpacity>

      <Typography type={'h6'} darkModeEnabled={!isLightThemeEnabled} paddingTop={15} style={styles.right} numberOfLines={3}>
        Last pressed: {text}
      </Typography>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    paddingTop: SafePadding,
  },
  left: {
    width: '20%',
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  middle: {
    width: '60%',
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  right: {
    width: '20%',
  },
  icon: {
    paddingBottom: 10,
    paddingLeft: 20,
  },
});
