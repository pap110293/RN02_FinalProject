import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  getComments,
  getLikes,
  getUser,
  likeAPost,
  unlikeAPost,
} from '../firebase/firestoreService';
import Avata from '../components/avata';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import screens from '../screens';
import {getCurrentUserId} from '../firebase/authService';

export default function Post({postData, navigation}) {
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(postData);
  const currentUserId = getCurrentUserId();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (post.userId) {
      getUser(post.userId).then(doc => {
        if (doc.exists) {
          const id = doc.id;
          const userData = doc.data();
          setUser({...userData, id});
        }
      });

      getLikes(post.id, post.userId).then(docs => {
        const data = docs.docs.map(doc => doc.id);
        setLikes(data);
      });

      getComments(post.id, post.userId).then(docs => {
        const commentDatas = docs.docs.map(doc => {
          if (doc.exists) {
            return {...doc.data(), id: doc.id};
          }
        });
        setComments(commentDatas);
      });
    }
  }, [isFocused]);

  const isLiked = () => likes.indexOf(currentUserId) > -1;

  const goToProfile = () => {
    navigation.push(screens.mains.profileUser, {uid: post.userId});
  };

  const goToComments = () => {
    navigation.push(screens.mains.comments, {
      post: post,
      user,
    });
  };

  const likeThePost = () => {
    likeAPost(post.id, user.id)
      .then(() => {
        setLikes(l => [...l, currentUserId]);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const unlikeThePost = () => {
    unlikeAPost(post.id, user.id)
      .then(() => {
        setLikes(l => l.filter(i => i != currentUserId));
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const toggleLike = () => {
    if (isLiked()) {
      unlikeThePost();
    } else {
      likeThePost();
    }
  };

  let lastTap = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleLike();
    } else {
      lastTap = now;
    }
  };

  const renderHeartIcon = () => {
    if (isLiked()) {
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
    if (post) {
      return (
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <View style={{paddingRight: 10}}>
              <Avata uri={user?.avatar} />
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                goToProfile();
              }}>
              <Text style={{fontWeight: '500'}}>{user.name}</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.imageContainer}>
            <TouchableWithoutFeedback onPressOut={handleDoubleTap}>
              <Image
                source={{uri: post.imageUrl}}
                style={styles.image}
                width="100%"
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.postFooter}>
            <View style={styles.postActions}>
              {renderHeartIcon()}
              <FontAwesomeIcon
                name="comment-o"
                size={20}
                style={{paddingLeft: 15}}
                onPress={goToComments}
              />
            </View>
            {likes.length > 0 && (
              <Text style={styles.likeText}>{likes.length} likes</Text>
            )}
            <View style={styles.captionContainer}>
              <Text>
                <Text style={{fontWeight: '500'}} onPress={goToProfile}>
                  {user.name}
                </Text>{' '}
                {post.caption}
              </Text>
            </View>
            {comments.length > 0 && (
              <View style={styles.commentSection}>
                <Text style={styles.secondaryText} onPress={goToComments}>
                  View all {comments.length} comments
                </Text>
              </View>
            )}
            <Text style={[styles.secondaryText, {paddingTop: 5}]}>
              {post.creation.toDate().toDateString()}
            </Text>
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
  captionContainer: {paddingTop: 10, flexDirection: 'row'},
  commentSection: {paddingTop: 5},
  secondaryText: {fontSize: 12, color: '#8f8f8f'},
});
