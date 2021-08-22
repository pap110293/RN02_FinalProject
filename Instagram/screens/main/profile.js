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
import screens from '..';

const ProfileScreen = ({navigation, route}) => {
  const uid = route.params?.uid;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUserPosts = useSelector(currentUserPostsSelector);
  const currentUser = useSelector(currentUserSelector);

  const fetchData = () => {
    if (uid) {
      if (isCurrentUser(uid)) {
        setUser(currentUser);
        setPosts(currentUserPosts);
        navigation.setOptions({headerTitle: currentUser.name});
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
  };

  useEffect(() => {
    fetchData();
  }, [uid, currentUser, currentUserPosts]);

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

  const goToProfilePosts = (uid, index) => {
    navigation.push(screens.mains.profilePosts, {userId: uid, index});
  };

  return (
    <SafeAreaView style={commonStyle.flex1}>
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
      <ImageList data={posts} goToProfilePosts={goToProfilePosts} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {},
  photosContainer: {},
});

export default ProfileScreen;
