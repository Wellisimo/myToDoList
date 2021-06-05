import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import ListScreenNavigator from '../ListScreenNavigator';
import UserInfoScreenNavigator from '../UserInfoScreenNavigator';
import { RootState } from '../../Helpers/Types';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';
import { SafeAreaView, StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

const bottomTab: React.FC = () => {
  const isLightThemeEnabled = useSelector(({isLightThemeEnabled}: RootState) => isLightThemeEnabled);
  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isLightThemeEnabled ? 'dark-content' : 'light-content'}
        backgroundColor={globalStyles.background.backgroundColor}
      />
      <Tab.Navigator
        initialRouteName="List"
        backBehavior="none"
        tabBarOptions={{
          activeBackgroundColor: isLightThemeEnabled ? 'white' : 'black',
          style: globalStyles.tabBarOptions,
        }}>
        <Tab.Screen
          name="ListScreenNavigator"
          component={ListScreenNavigator}
          options={{
            tabBarIcon: () => <FontAwesome name="list-ol" size={24} color={isLightThemeEnabled ? 'black' : 'white'} />,
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="UserInfoScreenNavigator"
          component={UserInfoScreenNavigator}
          options={{
            tabBarIcon: () => <AntDesign name="user" size={24} color={isLightThemeEnabled ? 'black' : 'white'} />,
            tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default bottomTab;
