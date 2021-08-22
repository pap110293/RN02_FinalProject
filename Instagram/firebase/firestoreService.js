import firestore from '@react-native-firebase/firestore';
import {getCurrentUserId} from './authService';
import firestoreCollections from './firestoreCollections';

const saveUserPost = (imageUrl, caption) => {
  const currentUserId = getCurrentUserId();
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(currentUserId)
    .collection(firestoreCollections.userPosts)
    .add({
      userId: currentUserId,
      imageUrl,
      caption,
      creation: firestore.FieldValue.serverTimestamp(),
    });
};

const getUser = uid => {
  return firestore().collection(firestoreCollections.users).doc(uid).get();
};

const getUserPosts = uid => {
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(uid)
    .collection(firestoreCollections.userPosts)
    .orderBy('creation', 'desc')
    .get();
};

const getUserPost = (userId, userPostId) => {
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(userId)
    .collection(firestoreCollections.userPosts)
    .doc(userPostId)
    .get();
};

const queryUser = queryText => {
  return firestore()
    .collection(firestoreCollections.users)
    .where('normalizedName', '>=', queryText.toLowerCase())
    .get();
};

const addUserFollowing = followUserId => {
  return firestore()
    .collection(firestoreCollections.following)
    .doc(getCurrentUserId())
    .collection(firestoreCollections.userFollowing)
    .doc(followUserId.toString())
    .set({});
};

const removeUserFollowing = unfollowUserId => {
  return firestore()
    .collection(firestoreCollections.following)
    .doc(getCurrentUserId())
    .collection(firestoreCollections.userFollowing)
    .doc(unfollowUserId)
    .delete();
};

const getUserFollowing = userId => {
  return firestore()
    .collection(firestoreCollections.following)
    .doc(getCurrentUserId())
    .collection(firestoreCollections.userFollowing)
    .doc(userId)
    .get();
};

const getUserFollowings = () => {
  return getUserFollowingsOfUser(getCurrentUserId());
};

const getUserFollowingsOfUser = uid => {
  return firestore()
    .collection(firestoreCollections.following)
    .doc(uid)
    .collection(firestoreCollections.userFollowing)
    .get();
};

const likeAPost = (postId, postOwnerId) => {
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(postOwnerId)
    .collection(firestoreCollections.userPosts)
    .doc(postId)
    .collection(firestoreCollections.postLikes)
    .doc(getCurrentUserId())
    .set({});
};

const unlikeAPost = (postId, postOwnerId) => {
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(postOwnerId)
    .collection(firestoreCollections.userPosts)
    .doc(postId)
    .collection(firestoreCollections.postLikes)
    .doc(getCurrentUserId())
    .delete();
};

const getLikes = (postId, postOwnerId) => {
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(postOwnerId)
    .collection(firestoreCollections.userPosts)
    .doc(postId)
    .collection(firestoreCollections.postLikes)
    .get();
};

const addComment = (postId, postOwnerId, comment) => {
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(postOwnerId)
    .collection(firestoreCollections.userPosts)
    .doc(postId)
    .collection(firestoreCollections.comments)
    .add({
      comment,
      creator: getCurrentUserId(),
      creation: firestore.FieldValue.serverTimestamp(),
    });
};

const getComments = (postId, postOwnerId) => {
  return firestore()
    .collection(firestoreCollections.posts)
    .doc(postOwnerId)
    .collection(firestoreCollections.userPosts)
    .doc(postId)
    .collection(firestoreCollections.comments)
    .orderBy('creation', 'desc')
    .get();
};

const updateAvatar = imageUrl => {
  return firestore()
    .collection(firestoreCollections.users)
    .doc(getCurrentUserId())
    .update({avatar: imageUrl});
};

export {
  saveUserPost,
  getUser,
  getUserPosts,
  getUserPost,
  queryUser,
  addUserFollowing,
  removeUserFollowing,
  getUserFollowing,
  getUserFollowings,
  getUserFollowingsOfUser,
  likeAPost,
  unlikeAPost,
  getLikes,
  addComment,
  getComments,
  updateAvatar,
};
