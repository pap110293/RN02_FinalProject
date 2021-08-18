import React, {useState} from 'react';
import {
  View,
  Image,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getCurrentUserId} from '../../firebase/authService';
import {saveUserPost} from '../../firebase/firestoreService';
import {postsPath, uploadImage} from '../../firebase/storageSerivce';
import {fetchUserPosts} from '../../redux/actions/user';
import commonStyle from '../../styles/commonStyles';

const SaveScreen = props => {
  const image = props.route.params.image;

  const [caption, setCaption] = useState('');

  const postHandler = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    const currentUserId = getCurrentUserId();
    const randomString = Math.random().toString(36);
    const childPath = `${postsPath}/${currentUserId}/${randomString}`;

    const task = uploadImage(childPath, blob);

    const onTaskSuccess = () => {
      task.snapshot.ref.getDownloadURL().then(url => {
        saveUserPost(url, caption).then(() => {
          props.fetchUserPosts();
          props.navigation.popToTop();
        });
      });
    };

    const onTaskError = error => {
      console.warn(error);
    };

    task.on('state_changed', null, onTaskError, onTaskSuccess);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={commonStyle.flex1}>
      <View style={commonStyle.flex1}>
        {image && (
          <Image source={{uri: image}} style={{flex: 1}} resizeMode="contain" />
        )}
        <View style={{flex: 0.5}}>
          <TextInput
            placeholder="Caption"
            value={caption}
            onChangeText={text => {
              setCaption(text);
            }}
          />
          <Button title="Post" onPress={postHandler} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapDispatchToProp = dispatch =>
  bindActionCreators({fetchUserPosts}, dispatch);

export default connect(null, mapDispatchToProp)(SaveScreen);
