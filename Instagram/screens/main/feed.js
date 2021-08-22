import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, FlatList, View, Image} from 'react-native';
import commonStyle from '../../styles/commonStyles';
import {connect, useSelector} from 'react-redux';
import {currentUserFollowingPostsSelector} from '../../redux/selectors/userSelector';
import {bindActionCreators} from 'redux';
import {fetchUserFollowingPosts} from '../../redux/actions/user';
import PostList from '../../components/postList';

const FeedScreen = ({fetchUserFollowingPosts, navigation}) => {
  const posts = useSelector(currentUserFollowingPostsSelector);

  useEffect(() => {
    fetchUserFollowingPosts();
  }, []);

  const refreshDataHandler = () => {
    fetchUserFollowingPosts();
  };

  return (
    <SafeAreaView style={commonStyle.flex1}>
      <PostList
        posts={posts}
        navigation={navigation}
        onRefresh={refreshDataHandler}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postContainer: {flex: 1},
  captionContainer: {flex: 1},
});

const mapDispatchToProp = dispatch =>
  bindActionCreators({fetchUserFollowingPosts}, dispatch);

export default connect(null, mapDispatchToProp)(FeedScreen);
