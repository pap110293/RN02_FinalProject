import React from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';

export default function ImageList({data}) {
  return (
    <View style={styles.photosContainer}>
      <FlatList
        numColumns={3}
        data={data}
        renderItem={({item}) => {
          return (
            <View style={styles.imageContainer}>
              <Image source={{uri: item.imageUrl}} style={styles.image} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {flex: 1 / 3, padding: 0.5},
  image: {aspectRatio: 1 / 1},
});
