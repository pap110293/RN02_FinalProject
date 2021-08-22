import storage from '@react-native-firebase/storage';

export const postsPath = 'posts';
export const avatarPath = 'avatars';

export const uploadImage = (filePath, blob) => {
  return storage().ref().child(filePath).put(blob);
};
