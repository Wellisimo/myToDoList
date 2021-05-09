import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { Entypo, Fontisto } from '@expo/vector-icons';

import { logout, changeStyle } from '../../redux/actions';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

export default props => {
  const [message, setMessage] = useState('press something');
  const isLightThemeEnabled = useSelector(state => state.isLightThemeEnabled);
  const dispatch = useDispatch();
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  const logOutHandler = async () => {
    const jsonValue = JSON.stringify(false);
    await AsyncStorage.setItem('isLogged', jsonValue);
    dispatch(logout());
  };

  useEffect(() => {
    props?.message && setMessage(props?.message);
  }, [props?.message]);

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
        <Text style={[{ paddingBottom: 10 }, globalStyles.buttonText]}>Log Out</Text>
      </TouchableOpacity>

      <Text style={[{ width: '20%', paddingTop: 25, paddingLeft: 10 }, globalStyles.supportText]}>
        Last pressed: {message}
      </Text>
    </View>
  );
};
