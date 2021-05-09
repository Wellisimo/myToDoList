import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../Components/Header';
import ListScreen from '../../Screens/ListScreen';

const Stack = createStackNavigator();

const ListScreenNavigator = () => {
  return (
    <Stack.Navigator headerMode="float">
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
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

export default ListScreenNavigator;
