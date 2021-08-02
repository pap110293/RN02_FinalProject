import React from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import commonStyle from '../styles/commonStyles';
import auth from '@react-native-firebase/auth';

export default function Landing() {
  const SignOutHandler = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={commonStyle.screen}>
      <Text>You are login</Text>
      <Button title="Sign Out" onPress={SignOutHandler} />
    </SafeAreaView>
  );
}
