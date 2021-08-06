import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import commonStyle from '../../styles/commonStyles';

const SearchScreen = () => {
  return (
    <SafeAreaView style={commonStyle.screen}>
      <Text>Hello this is search screen</Text>
    </SafeAreaView>
  );
};

export default SearchScreen;
