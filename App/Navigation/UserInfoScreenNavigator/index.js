import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../Components/Header';
import UserInfoScreen from '../../Screens/UserInfoScreen';

const Stack = createStackNavigator();

const UserInfoScreenNavigator = () => {
  return (
    <Stack.Navigator headerMode="float">
      <Stack.Screen
        name="UserInfoScreen"
        component={UserInfoScreen}
        options={{
          title: null,
          header: childProps => {
            return <Header message={childProps.scene?.__memo[0]?.params?.message} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default UserInfoScreenNavigator;
