import React, {useEffect} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import styles from './styles';

import GetStore from '../../Components/LoginStatus';

export default welcomeScreen = (props) => {
    useEffect(() => {
        (async () => {
            let store = new GetStore();
            await store.loadStore()
            let status = store.getStatus('isLogged');

            status 
                ? props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'BottomTabWithHeader' },
                        ],
                    })
                ) 
                : null
        })()
    })

    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontSize: 20, fontWeight: '600', paddingBottom: 50}]}>Welcome to my ToDo List</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => props.navigation.navigate('Login')}
            >
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => props.navigation.navigate('Register')}
            >
                <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
        </View>
    )
};