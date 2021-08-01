import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import screens from '../screens';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens.login.name}>
        <Stack.Screen
          name={screens.login.name}
          component={screens.login.screen}
        />
        <Stack.Screen
          name={screens.register.name}
          component={screens.register.screen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
