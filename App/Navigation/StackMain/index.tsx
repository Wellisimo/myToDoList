import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../Helpers/Types';
import LoginHandle from '../LoginHandle';
import BottomTab from '../BottomTab';

import { checkLogin } from '../../redux/actions';

const Stack = createStackNavigator();

const stackMain: React.FC = () => {
  const login = useSelector(({login}: RootState) => login);
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
