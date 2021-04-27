import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';

import LoginHandle from '../LoginHandle';
import BottomTabWithHeader from '../BottomTabWithHeader';

import {checkLogin} from '../../redux/actions';

const Stack = createStackNavigator();

const stackMain = (props) => {
  props.checkLogin()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { !props.login ? (
          <Stack.Screen
            name="LoginHandle"
            component={LoginHandle}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="BottomTabWithHeader"
            component={BottomTabWithHeader}
            options={{headerShown: false}}
            initialParams={{ show: 'press something' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, {checkLogin: checkLogin})(stackMain)