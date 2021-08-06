import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import commonStyle from '../../styles/commonStyles';

const ActivityScreen = () => {
  return (
    <SafeAreaView style={commonStyle.screen}>
      <Text>Hello this is activity screen</Text>
    </SafeAreaView>
  );
};

export default ActivityScreen;
