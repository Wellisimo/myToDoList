import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../Components/Header';
import UserInfoScreen from '../../Screens/UserInfoScreen';

const Stack = createStackNavigator();

type HeaderChildProps = {
  scene?: any;
};

const UserInfoScreenNavigator = () => {
  return (
    <Stack.Navigator headerMode="float">
      <Stack.Screen
        name="UserInfoScreen"
        component={UserInfoScreen}
        options={{
          header: (childProps: HeaderChildProps) => {
            return <Header message={childProps.scene?.__memo[0]?.params?.message} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default UserInfoScreenNavigator;
