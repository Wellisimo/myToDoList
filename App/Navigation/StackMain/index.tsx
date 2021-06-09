import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../redux/useAppSelector';
import LoginHandle from '../LoginHandle';
import BottomTab from '../BottomTab';

import { checkLogin } from '../../redux/actions';

const Stack = createStackNavigator();

const stackMain = () => {
  const login = useAppSelector(({ login }) => login);
  const dispatch = useDispatch();
  dispatch(checkLogin());

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!login ? (
          <Stack.Screen name="LoginHandle" component={LoginHandle} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default stackMain;
