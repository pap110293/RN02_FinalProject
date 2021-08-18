import React, {useState, useEffect} from 'react';
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
      return <MainNavigation />;
    }
    return <AuthNavigation />;
  };

  return <Navigator />;
};

export default RootNavigation;
