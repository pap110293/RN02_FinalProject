import auth from '@react-native-firebase/auth';

export const getCurrentUser = () => {
  return auth().currentUser;
};

export const getCurrentUserId = () => {
  return getCurrentUser().uid;
};

export const signInWithEmailAndPassword = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const createUserWithEmailAndPassword = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signOut = () => {
  auth().signOut();
};

export const isCurrentUser = uid => {
  return getCurrentUserId() === uid;
};
