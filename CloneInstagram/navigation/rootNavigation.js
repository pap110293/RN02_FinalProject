import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import screens from '../screens';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null; // add loading sceen here

  let navigator = user => {
    if (user) {
      return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name={screens.landding.name}
            component={screens.landding.screen}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name={screens.login.name}
          component={screens.login.screen}
        />
        <Stack.Screen
          name={screens.register.name}
          component={screens.register.screen}
        />
      </Stack.Navigator>
    );
  };

  return <NavigationContainer>{navigator(user)}</NavigationContainer>;
};

export default RootNavigation;
