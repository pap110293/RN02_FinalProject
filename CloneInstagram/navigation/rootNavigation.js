import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import AuthNavigation from './authNavigation';
import MainNavigation from './mainNavigation';

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

  let Navigator = () => {
    if (user) {
      return (
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    );
  };

  return <Navigator />;
};

export default RootNavigation;
