import firestore from '@react-native-firebase/firestore';
import {getCurrentUserId} from './authService';
import firestoreCollections from './firestoreCollections';

export const saveUserPost = (imageUrl, caption) => {
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(getCurrentUserId())
    .collection(firestoreCollections.userPosts)
    .add({
      imageUrl,
      caption,
      creation: firestore.FieldValue.serverTimestamp(),
    });
};

export const getUser = uid => {
  return firestore().collection(firestoreCollections.users).doc(uid).get();
};

export const getUserPosts = uid => {
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(uid)
    .collection(firestoreCollections.userPosts)
    .orderBy('creation', 'asc')
    .get();
};

export const queryUser = queryText => {
  return firestore()
    .collection(firestoreCollections.users)
    .where('normalizedName', '>=', queryText.toLowerCase())
    .get();
};

export const addUserFollowing = followUserId => {
  return firestore()
    .collection(firestoreCollections.following)
    .doc(getCurrentUserId())
    .collection(firestoreCollections.userFollowing)
    .doc(followUserId.toString())
    .set({});
};

export const removeUserFollowing = unfollowUserId => {
  return firestore()
    .collection(firestoreCollections.following)
    .doc(getCurrentUserId())
    .collection(firestoreCollections.userFollowing)
    .doc(unfollowUserId)
    .delete();
};

export const getUserFollowing = userId => {
  return firestore()
    .collection(firestoreCollections.following)
    .doc(getCurrentUserId())
    .collection(firestoreCollections.userFollowing)
    .doc(userId)
    .get();
};
