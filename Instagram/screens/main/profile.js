import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Button} from 'react-native';
import {isCurrentUser, signOut} from '../../firebase/authService';
import commonStyle from '../../styles/commonStyles';
import ImageList from '../../components/imageList';
import {
  addUserFollowing,
  getUser,
  getUserPosts,
  getUserFollowing,
  removeUserFollowing,
} from '../../firebase/firestoreService';
import {mapFirestoreObjectToData} from '../../utils/mapUtils';
import EmptyScreen from '../Empty';
import {useSelector} from 'react-redux';
import {
  currentUserPostsSelector,
  currentUserSelector,
} from '../../redux/selectors/userSelector';

const ProfileScreen = ({navigation, route}) => {
  const uid = route.params?.uid;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUserPost = useSelector(currentUserPostsSelector);
  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    if (uid) {
      if (isCurrentUser(uid)) {
        setUser(currentUser);
        setPosts(currentUserPost);
      } else {
        getUser(uid).then(snapshot => {
          const data = snapshot.data();

          setUser(data);

          navigation.setOptions({headerTitle: data.name});
        });

        getUserPosts(uid).then(snapshot => {
          const data = snapshot.docs.map(mapFirestoreObjectToData);
          setPosts(data);
        });

        getUserFollowing(uid).then(doc => {
          setIsFollowing(doc.exists);
        });
      }
    }
  }, [uid, currentUser, currentUserPost]);

  const followHandler = () => {
    addUserFollowing(uid)
      .then(() => {
        setIsFollowing(true);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const unfollowHandler = () => {
    removeUserFollowing(uid)
      .then(() => {
        setIsFollowing(false);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  if (!user) {
    return <EmptyScreen />;
  }

  return (
    <SafeAreaView style={commonStyle.flex1}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
          {!isCurrentUser(uid) && (
            <View>
              {isFollowing ? (
                <Button title="Unfollow" onPress={unfollowHandler} />
              ) : (
                <Button title="Follow" onPress={followHandler} />
              )}
            </View>
          )}

          {isCurrentUser(uid) && (
            <Button title="Sign Out" onPress={() => signOut()} />
          )}
        </View>
        <ImageList data={posts} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  infoContainer: {},
  photosContainer: {},
});

export default ProfileScreen;
