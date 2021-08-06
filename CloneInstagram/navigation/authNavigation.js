import React from 'react';
import createNativeStackNavigator from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.login} component={LoginScreen} />
      <Stack.Screen name={screens.register} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
