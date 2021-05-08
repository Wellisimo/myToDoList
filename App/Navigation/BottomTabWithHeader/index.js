import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity, View, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';

import { Entypo, Fontisto } from '@expo/vector-icons';

import { logout, changeStyle } from '../../redux/actions';

import BottomTab from '../BottomTab';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const Stack = createStackNavigator();

const bottomTabWithHeader = props => {
  const [message, setMessage] = useState('');
  const style = useSelector(state => state.style);
  const dispatch = useDispatch();
  const globalStyles = style ? globalStylesWhite : globalStylesDark;

  const logOutHandler = async () => {
    const jsonValue = JSON.stringify(false);
    await AsyncStorage.setItem('isLogged', jsonValue);
    dispatch(logout());
  };

  const callBack = data => {
    setMessage(data);
  };

  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

  return (
    <Stack.Navigator headerMode="float">
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          title: null,
          header: () => (
            <View
              style={[
                { width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' },
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
                {style ? (
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
                Last pressed: {message || props.route.params?.show}
              </Text>
            </View>
          ),
        }}
        initialParams={{ callBack }}
      />
    </Stack.Navigator>
  );
};

export default bottomTabWithHeader;
