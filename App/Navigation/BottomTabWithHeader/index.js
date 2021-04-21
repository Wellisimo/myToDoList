import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

import BottomTab from '../BottomTab';
import globalStyles from '../../Styles';

const Stack = createStackNavigator();

const bottomTabWithHeader = (props) => {
  const logOutHandler = async () => {
    const jsonValue = JSON.stringify(false)
    await AsyncStorage.setItem('isLogged', jsonValue)
    props.navigation.navigate('LoginHandle');
  }

  return (
    <Stack.Navigator 
      headerMode='float'
    >
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          title: null,
          header: () => (
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity 
                style={[{width: '70%', height: 60, justifyContent: 'flex-end', alignItems: 'center'}, globalStyles.navigationHeader]} 
                onPress={logOutHandler}
              >
                <Text style={{fontWeight: '600', fontSize: 18, paddingBottom: 10}}>Log Out</Text>
              </TouchableOpacity>
              <Text style={[{width: '30%', paddingTop: 25, paddingLeft: 10} ,globalStyles.supportText, globalStyles.navigationHeader]}>Last pressed: {props.test}</Text>
            </View>
          )
        }}
      />
    </Stack.Navigator>
  )
}

const mapStateToProps = (state) => {
    return {test: state.test};
};

export default connect(mapStateToProps)(bottomTabWithHeader);