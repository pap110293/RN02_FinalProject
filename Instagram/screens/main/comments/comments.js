import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import screens from '../..';
import Avata from '../../../components/avata';
import {addComment, getComments} from '../../../firebase/firestoreService';
import commonStyle from '../../../styles/commonStyles';
import CommentItem from './commentItem';

export default function CommentsScreen({route, navigation}) {
  const {user, post} = route.params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [keyboardOffet, setkeyboardOffet] = useState(0);
  const [sending, setSending] = useState(false);

  const goToProfile = () => {
    navigation.push(screens.mains.outProfileUser, {uid: post.userId});
  };

  useEffect(() => {
    if (user?.id && post?.id) {
      fetchComments();
    }

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const fetchComments = () => {
    getComments(post.id, user.id).then(snapshot => {
      const data = snapshot.docs.map(i => {
        const id = i.id;
        return {...i.data(), id};
      });
      setComments(data);
    });
  };

  const keyboardDidShow = event => {
    setkeyboardOffet(event.endCoordinates.height - 40);
  };

  const keyboardDidHide = event => {
    setkeyboardOffet(0);
  };

  const sendComment = () => {
    if (comment !== '') {
      addComment(post.id, user.id, comment).then(() => {
        fetchComments();
        setComment('');
      });
    }
  };

  return (
    <SafeAreaView style={commonStyle.flex1}>
      <KeyboardAvoidingView style={commonStyle.flex1}>
        <View style={{flex: 0.93}}>
          <View style={styles.captionContainer}>
            <View style={styles.avataContainer}>
              <Avata uri={user?.avatar} />
            </View>
            <View style={styles.captionTextContainer}>
              <Text>
                <Text style={{fontWeight: '500'}} onPress={goToProfile}>
                  {user.name}
                </Text>{' '}
                {post.caption}
              </Text>
              <Text style={{fontSize: 12, color: '#a1a1a1'}}>
                {post.creation.toDate().toDateString()}
              </Text>
            </View>
          </View>
          <View style={styles.devide}></View>
          <FlatList
            data={comments}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item}) => {
              if (item) {
                return <CommentItem comment={item} navigation={navigation} />;
              }
            }}
          />
        </View>

        <View
          style={[
            styles.commentInputContainer,
            {
              bottom: keyboardOffet,
            },
          ]}>
          <TextInput
            placeholder="Comment here ..."
            onChangeText={text => {
              setComment(text);
            }}
            returnKeyType="send"
            onSubmitEditing={sendComment}
            value={comment}
            style={styles.inputComment}
          />
          <IoniconsIcon
            name="send"
            size={30}
            color="blue"
            style={styles.commentIcon}
            onPress={sendComment}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  commentsScreen: {flex: 1, paddingTop: 10},
  commentInputContainer: {
    flexDirection: 'row',
    flex: 0.08,
    backgroundColor: 'white',
    position: 'absolute',
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  avataContainer: {flex: 0.1, paddingRight: 10},
  captionTextContainer: {flex: 1},
  devide: {
    borderBottomWidth: 1,
    marginVertical: 20,
    borderBottomColor: '#c4c4c4',
  },
  inputComment: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginBottom: 6,
    flex: 1,
  },
  commentIcon: {paddingLeft: 10},
});
