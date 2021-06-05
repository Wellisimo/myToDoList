import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../Components/Header';
import ListScreen from '../../Screens/ListScreen';

const Stack = createStackNavigator();

type HeaderChildProps = {
  scene?: any;
}

const ListScreenNavigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="float">
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{
          header: (childProps: HeaderChildProps) => {
            return <Header message={childProps.scene?.__memo[0]?.params?.message} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ListScreenNavigator;
