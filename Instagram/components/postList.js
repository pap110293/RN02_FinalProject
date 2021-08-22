import React, {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import Post from './post';

export default function PostList({posts, navigation, index, onRefresh}) {
  const postListRef = useRef();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const rollToIndex = () => {
    setTimeout(() => {
      if (index !== undefined) {
        if (postListRef?.current?.props?.data) {
          postListRef.current.scrollToIndex({index: index, animated: true});
        } else {
          rollToIndex();
        }
      }
    }, 200);
  };

  useEffect(() => {
    if (index !== undefined) {
      rollToIndex();
    }
  }, []);

  const refreshData = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const renderFlatListItem = ({item}) => {
    return <Post key={item.id} postData={item} navigation={navigation} />;
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderFlatListItem}
      ref={postListRef}
      onRefresh={refreshData}
      refreshing={isRefreshing}
    />
  );
}
