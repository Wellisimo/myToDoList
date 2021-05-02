import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import ListScreen from '../../Screens/ListScreen';
import UserInfoScreen from '../../Screens/UserInfoScreen';

import { changeStyle } from '../../redux/actions';

import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const Tab = createBottomTabNavigator();

const bottomTab = (props) => {
  const globalStyles = props.style ? globalStylesWhite : globalStylesDark;

  return (
    <Tab.Navigator
      initialRouteName="List"
      backBehavior="none"
      tabBarOptions={{
        showIcon: true,
        activeBackgroundColor: props.style ? 'white' : 'black',
        style: globalStyles.tabBarOptions,
      }}
    >
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="list-ol" size={24} color={props.style ? 'black' : 'white'} />,
          tabBarLabel: () => null,
        }}
        initialParams={{ callBack: props.route.params.callBack }}
      />
      <Tab.Screen
        name="User"
        component={UserInfoScreen}
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} color={props.style ? 'black' : 'white'} />,
          tabBarLabel: () => null,
        }}
        initialParams={{ callBack: props.route.params.callBack }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => ({
  style: state.style,
});

export default connect(
  mapStateToProps,
  {
    changeStyle,
  },
)(bottomTab);
