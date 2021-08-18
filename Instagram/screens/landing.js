import React, {useEffect} from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import commonStyle from '../styles/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser, fetchUserPosts} from '../redux/actions/user';
import {currentUserSelector} from '../redux/selectors/userSelector';
import {signOut} from '../firebase/authService';

const LandingScreen = ({fetchUser, fetchUserPosts}) => {
  const myIcon = <Icon name="rocket" size={30} color="#900" />;

  const SignOutHandler = () => {
    signOut();
  };

  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []);

  return (
    <SafeAreaView style={commonStyle.screen}>
      <Text>
        Hello {currentUser?.name} {myIcon}
      </Text>
      <Button title="Sign Out" onPress={SignOutHandler} />
    </SafeAreaView>
  );
};

const mapDispatchToProp = dispatch =>
  bindActionCreators({fetchUser, fetchUserPosts}, dispatch);

export default connect(null, mapDispatchToProp)(LandingScreen);
