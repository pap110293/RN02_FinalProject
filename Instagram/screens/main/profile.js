import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  getCurrentUserId,
  isCurrentUser,
  signOut,
} from '../../firebase/authService';
import commonStyle from '../../styles/commonStyles';
import ImageList from '../../components/imageList';
import {
  addUserFollowing,
  getUser,
  getUserPosts,
  getUserFollowing,
  removeUserFollowing,
  updateAvatar,
  getUserFollowingsOfUser,
} from '../../firebase/firestoreService';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {mapFirestoreObjectToData} from '../../utils/mapUtils';
import EmptyScreen from '../Empty';
import {connect, useSelector} from 'react-redux';
import {
  currentUserPostsSelector,
  currentUserSelector,
} from '../../redux/selectors/userSelector';
import screens from '..';
import {avatarPath, uploadImage} from '../../firebase/storageSerivce';
import {fetchUser} from '../../redux/actions/user';
import {bindActionCreators} from 'redux';

const ProfileScreen = ({fetchUser, navigation, route}) => {
  const uid = route.params?.uid;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersNumber, setFollowersNumber] = useState([]);
  const [folloingsNumnber, setFollowingNumber] = useState([]);
  const currentUserPosts = useSelector(currentUserPostsSelector);
  const currentUser = useSelector(currentUserSelector);
  const actionSheet = useRef();

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

      getUserFollowingsOfUser(uid).then(snapshot => {
        setFollowingNumber(snapshot.docs.length);
      });
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

  const uploadAvatar = async image => {
    const response = await fetch(image);
    const blob = await response.blob();
    const currentUserId = getCurrentUserId();
    const randomString = Math.random().toString(36);
    const childPath = `${avatarPath}/${currentUserId}/${randomString}`;

    const task = uploadImage(childPath, blob);

    const onTaskSuccess = () => {
      task.snapshot.ref.getDownloadURL().then(url => {
        updateAvatar(url).then(() => {
          fetchUser();
        });
      });
    };

    const onTaskError = error => {
      console.warn(error);
    };

    task.on('state_changed', null, onTaskError, onTaskSuccess);
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
        <View style={styles.avatarNameNumber}>
          <View style={styles.avatarContainer}>
            <Avatar
              title={user?.name[0]}
              source={{uri: user?.avatar}}
              rounded
              containerStyle={{backgroundColor: '#919191'}}
              activeOpacity={0.7}
              size="large">
              {isCurrentUser(uid) && (
                <Avatar.Accessory
                  name="pencil-alt"
                  type="font-awesome-5"
                  size={20}
                  style={{backgroundColor: '#5487eb'}}
                  onPress={() => {
                    actionSheet.current.show();
                  }}
                />
              )}
            </Avatar>
          </View>
          <View style={styles.numberSection}>
            <View style={styles.numberItem}>
              <Text style={styles.number}>{posts.length}</Text>
              <Text>Posts</Text>
            </View>
            {/* <View style={styles.numberItem}>
              <Text style={styles.number}>123</Text>
              <Text>Followers</Text>
            </View> */}
            <View style={styles.numberItem}>
              <Text style={styles.number}>{folloingsNumnber}</Text>
              <Text>following</Text>
            </View>
          </View>
        </View>
        <Text style={{fontWeight: '700'}}>{user?.name}</Text>
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
      <ActionSheet
        ref={actionSheet}
        title={'Update avatar'}
        options={['Take picture', 'Upload Image', 'cancel']}
        cancelButtonIndex={2}
        onPress={index => {
          switch (index) {
            case 0:
              ImagePicker.openCamera({cropping: true})
                .then(image => {
                  uploadAvatar(image.path);
                })
                .catch(error => {
                  Alert.alert('Opps', error.message);
                });
              break;
            case 1:
              ImagePicker.openPicker({cropping: true})
                .then(image => {
                  uploadAvatar(image.path);
                })
                .catch(error => {
                  Alert.alert('Opps', error.message);
                });
              break;
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {padding: 10},
  photosContainer: {},
  avatarNameNumber: {paddingBottom: 10, flexDirection: 'row', width: '100%'},
  avatarContainer: {width: 100},
  numberSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    flex: 1,
  },
  numberItem: {alignItems: 'center'},
  number: {fontWeight: '700', fontSize: 16},
});

const mapDispatchToProp = dispatch => bindActionCreators({fetchUser}, dispatch);

export default connect(null, mapDispatchToProp)(ProfileScreen);
