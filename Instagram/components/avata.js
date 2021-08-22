import React from 'react';
import {View, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';

export default function Avata({uri, externalStyle}) {
  const renderAvataImage = () => {
    return (
      <Avatar
        source={{uri: uri}}
        rounded
        containerStyle={{backgroundColor: '#919191'}}
        activeOpacity={0.7}
        size="small"
      />
    );
  };

  return <View style={externalStyle}>{renderAvataImage()}</View>;
}

const styles = StyleSheet.create({
  avataContainer: {},
  avtImage: {},
});
