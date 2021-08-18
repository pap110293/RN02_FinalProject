import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';
import screens from '../screens';

const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={screens.login} component={LoginScreen} />
        <Stack.Screen name={screens.register} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
