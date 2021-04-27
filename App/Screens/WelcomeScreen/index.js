import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

export default welcomeScreen = (props) => {
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