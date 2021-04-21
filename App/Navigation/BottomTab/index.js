import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import ListScreen from '../../Screens/ListScreen';
import UserInfoScreen from '../../Screens/UserInfoScreen';

const Tab = createBottomTabNavigator();

export default bottomTab = () => {
  return (
    <Tab.Navigator 
      initialRouteName="List"
      backBehavior='none'
      tabBarOptions={{
        activeBackgroundColor: 'white',
        inactiveBackgroundColor: '#ccc6c6',
        showIcon: true,
      }}
    >
      <Tab.Screen 
        name="List" 
        component={ListScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="list-ol" size={24} color="black" />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="User" 
        component={UserInfoScreen}
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
}