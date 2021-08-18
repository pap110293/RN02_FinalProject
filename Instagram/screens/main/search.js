import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import screens from '..';
import {queryUser} from '../../firebase/firestoreService';
import commonStyle from '../../styles/commonStyles';
import {mapFirestoreObjectToData} from '../../utils/mapUtils';
import {isNullOrEmpty} from '../../utils/stringUtils';

const SearchScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);

  const searchUser = searchText => {
    if (isNullOrEmpty(searchText)) {
      setUsers([]);
      return;
    }

    queryUser(searchText)
      .then(data => {
        const users = data.docs.map(mapFirestoreObjectToData);
        setUsers(users);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  return (
    <SafeAreaView style={commonStyle.flex1}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search"
          onChangeText={search => searchUser(search)}
          style={styles.searchInput}
        />
      </View>
      <FlatList
        numColumns={1}
        data={users}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push(screens.mains.profileUser, {uid: item.id});
              }}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  searchInput: {
    borderRadius: 10,
    width: '90%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#dedede',
  },
  usersContainer: {},
});

export default SearchScreen;
