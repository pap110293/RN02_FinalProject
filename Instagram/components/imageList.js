import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

export default function ImageList({data, goToProfilePosts}) {
  return (
    <FlatList
      numColumns={3}
      data={data}
      renderItem={({item, index}) => {
        return (
          <View style={styles.imageContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                goToProfilePosts(item.userId, index);
              }}>
              <Image source={{uri: item.imageUrl}} style={styles.image} />
            </TouchableWithoutFeedback>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {flex: 1 / 3, padding: 0.5},
  image: {aspectRatio: 1},
});
