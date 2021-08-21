import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  getUser,
  isLikeThePost,
  likeAPost,
  unlikeAPost,
} from '../firebase/firestoreService';
import Avata from '../components/avata';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import screens from '../screens';

export default function Post({postData, navigation}) {
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (postData.userId) {
      getUser(postData.userId).then(doc => {
        if (doc.exists) {
          const id = doc.id;
          const userData = doc.data();
          setUser({...userData, id});
        }
      });

      isLikeThePost(postData.userId, postData.id).then(liked => {
        setLiked(liked);
      });
    }
  }, [liked]);

  const gotoProfile = () => {
    navigation.push(screens.mains.profileUser, {uid: user.id});
  };

  const likeThePost = () => {
    console.log(postData.id);
    console.log(user.id);
    likeAPost(postData.id, user.id)
      .then(() => {
        setLiked(true);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const unlikeThePost = () => {
    unlikeAPost(postData.id, user.id)
      .then(() => {
        setLiked(false);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const renderHeartIcon = () => {
    if (liked) {
      return (
        <TouchableWithoutFeedback onPress={unlikeThePost}>
          <FontAwesomeIcon name="heart" size={20} color="red" />
        </TouchableWithoutFeedback>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={likeThePost}>
        <FontAwesomeIcon name="heart-o" size={20} />
      </TouchableWithoutFeedback>
    );
  };

  const renderPost = () => {
    if (postData) {
      return (
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <View style={{paddingRight: 10}}>
              <Avata size={20} />
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                gotoProfile();
              }}>
              <Text style={{fontWeight: '500'}}>{user.name}</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: postData.imageUrl}}
              style={styles.image}
              width="100%"
            />
          </View>
          <View style={styles.postFooter}>
            <View style={styles.postActions}>
              {renderHeartIcon()}
              <FontAwesomeIcon
                name="comment-o"
                size={20}
                style={{paddingLeft: 15}}
              />
            </View>
            <Text style={styles.likeText}>1.234 likes</Text>
            <Text style={styles.captionText}>
              <Text style={{fontWeight: '500'}}>{user.name}</Text>{' '}
              {postData.caption}
            </Text>
            <View style={styles.commentSection}>
              <Text style={{fontSize: 12, color: '#8f8f8f'}}>
                View all comments
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  };

  return renderPost();
}

const styles = StyleSheet.create({
  imageContainer: {flex: 1, padding: 0.5},
  image: {aspectRatio: 1},
  postContainer: {flex: 1},
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  postFooter: {paddingHorizontal: 10},
  postActions: {flexDirection: 'row', paddingTop: 10},
  likeText: {paddingTop: 10, fontWeight: '600'},
  captionText: {paddingTop: 10},
  commentSection: {paddingTop: 5},
});
