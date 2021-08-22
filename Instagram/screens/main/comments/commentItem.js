import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import screens from '../..';
import Avata from '../../../components/avata';
import {getUser} from '../../../firebase/firestoreService';

export default function CommentItem({comment, navigation, key}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(comment.creator).then(snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data();
        setUser(data);
      }
    });
  }, []);

  const goToProfile = () => {
    navigation.push(screens.mains.outProfileUser, {uid: comment.creator});
  };

  return (
    <View key={key} style={styles.captionContainer}>
      <View style={styles.avataContainer}>
        <Avata uri={user?.avatar} />
      </View>
      <View style={styles.captionTextContainer}>
        <Text>
          <Text style={{fontWeight: '500'}} onPress={goToProfile}>
            {user.name}
          </Text>{' '}
          {comment.comment}
        </Text>
        <Text style={{fontSize: 12, color: '#a1a1a1'}}>
          {comment.creation.toDate().toDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  avataContainer: {flex: 0.1, paddingRight: 10},
  captionTextContainer: {flex: 1},
});
