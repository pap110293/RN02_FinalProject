import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import PostList from '../../components/postList';
import {getUser, getUserPosts} from '../../firebase/firestoreService';
import commonStyle from '../../styles/commonStyles';
import {mapFirestoreObjectToData} from '../../utils/mapUtils';

export default function ProfilePosts({route, navigation}) {
  const [posts, setposts] = useState([]);
  const indexParam = route.params?.index;
  const userIdParam = route.params?.userId;

  const fetchData = () => {
    getUserPosts(userIdParam).then(snapshot => {
      const datas = snapshot.docs.map(mapFirestoreObjectToData);
      if (datas.length > 0) {
        setposts(datas);
      }
    });

    getUser(userIdParam).then(snapshot => {
      if (snapshot.exists) {
        const user = snapshot.data();
        navigation.setOptions({headerTitle: user.name});
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, [route.params?.userIdParam]);

  return (
    <SafeAreaView style={commonStyle.flex1}>
      <PostList
        posts={posts}
        navigation={navigation}
        index={indexParam}
        onRefresh={fetchData}
      />
    </SafeAreaView>
  );
}
