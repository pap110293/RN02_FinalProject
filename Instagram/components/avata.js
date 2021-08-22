import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function Avata({size, uri, externalStyle}) {
  const avtStyle = {
    borderRadius: size / 2,
    width: size,
    height: size,
  };

  const renderAvataImage = () => {
    if (uri) {
      return <Image source={{uri}} styles={[avtStyle]} />;
    }

    return <FontAwesomeIcon name="user-o" size={size} />;
  };

  return <View style={[avtStyle, externalStyle]}>{renderAvataImage()}</View>;
}

const styles = StyleSheet.create({
  avataContainer: {},
  avtImage: {},
});
