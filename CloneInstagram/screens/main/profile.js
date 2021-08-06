import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import commonStyle from '../../styles/commonStyles';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={commonStyle.screen}>
      <Text>Hello this is profile screen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
