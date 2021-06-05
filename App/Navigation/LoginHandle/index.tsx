import React from 'react';
import { Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../../Screens/WelcomeScreen';
import LoginScreen from '../../Screens/LoginScreen';
import RegisterScreen from '../../Screens/RegisterScreen';

const Stack = createStackNavigator();

const LoginHandle: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
  >
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        headerShown: false,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: forSlide,
        gestureDirection: 'horizontal-inverted',
      }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        headerShown: false,
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: forSlide,
        gestureDirection: 'horizontal',
      }}
    />
  </Stack.Navigator>
);

export default LoginHandle;

const config: any = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forSlide = ({
  current, next, inverted, layouts: { screen },
}: any) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};
