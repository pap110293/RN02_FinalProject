import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import commonStyle from '../../styles/commonStyles';
import Icon from 'react-native-vector-icons/AntDesign';

const FeedScreen = () => {
  const icon = <Icon name="home" />;
  return (
    <SafeAreaView style={commonStyle.screen}>
      <Text>Hello this is feed screen {icon}</Text>
    </SafeAreaView>
  );
};

export default FeedScreen;
