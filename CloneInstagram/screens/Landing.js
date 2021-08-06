import React, {useEffect} from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import commonStyle from '../styles/commonStyles';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../redux/actions/user';
import {currentUserSelector} from '../redux/selectors/userSelector';

const Landing = ({fetchUser}) => {
  const myIcon = <Icon name="rocket" size={30} color="#900" />;

  const SignOutHandler = () => {
    auth().signOut();
  };

  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    fetchUser();
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

const mapDispatchToProp = dispatch => bindActionCreators({fetchUser}, dispatch);

export default connect(null, mapDispatchToProp)(Landing);
