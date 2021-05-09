import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import ListScreen from '../../Screens/ListScreen';
import UserInfoScreen from '../../Screens/UserInfoScreen';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const Tab = createBottomTabNavigator();

const bottomTab = () => {
  const style = useSelector(state => state.style);
  const globalStyles = style ? globalStylesWhite : globalStylesDark;

  return (
    <Tab.Navigator
      initialRouteName="List"
      backBehavior="none"
      tabBarOptions={{
        showIcon: true,
        activeBackgroundColor: style ? 'white' : 'black',
        style: globalStyles.tabBarOptions,
      }}>
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="list-ol" size={24} color={style ? 'black' : 'white'} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="User"
        component={UserInfoScreen}
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} color={style ? 'black' : 'white'} />,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default bottomTab;
