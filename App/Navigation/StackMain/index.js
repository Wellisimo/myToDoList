import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginHandle from '../LoginHandle';
import BottomTabWithHeader from '../BottomTabWithHeader';



const Stack = createStackNavigator();

export default stackMain = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LoginHandle"
      >
        <Stack.Screen
          name="LoginHandle"
          component={LoginHandle}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabWithHeader"
          component={BottomTabWithHeader}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}