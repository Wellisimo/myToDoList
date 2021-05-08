import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import LoginHandle from '../LoginHandle';
import BottomTabWithHeader from '../BottomTabWithHeader';

import { checkLogin } from '../../redux/actions';

const Stack = createStackNavigator();

const stackMain = () => {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();
  dispatch(checkLogin());

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!login ? (
          <Stack.Screen name="LoginHandle" component={LoginHandle} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen
            name="BottomTabWithHeader"
            component={BottomTabWithHeader}
            options={{ headerShown: false }}
            initialParams={{ show: 'press something' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default stackMain;
