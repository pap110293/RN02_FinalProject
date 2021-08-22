import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import screens from '..';
import {Button, Input, Text} from 'react-native-elements';

import commonStyle from '../../styles/commonStyles';
import {signInWithEmailAndPassword} from '../../firebase/authService';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowingPosts,
} from '../../redux/actions/user';

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .required('Password is required'),
});

function LoginScreen({
  fetchUser,
  fetchUserPosts,
  fetchUserFollowingPosts,
  navigation,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmitFormik = values => {
    setLoading(true);
    signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        fetchUser();
        fetchUserPosts();
        fetchUserFollowingPosts();
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Opps', 'Email or Password is invalid!');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView style={commonStyle.flex1} behavior="height">
        <SafeAreaView style={commonStyle.screen}>
          <View style={styles.headerContainer}>
            <Text h1 style={styles.headerText}>
              Login
            </Text>
          </View>
          <Formik
            validationSchema={loginSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={handleSubmitFormik}>
            {({values, handleSubmit, handleChange, errors}) => (
              <>
                <View style={styles.formContainer}>
                  <View style={commonStyle.fullWidth}>
                    <Input
                      onChangeText={handleChange('email')}
                      placeholder="email@address.com"
                      value={values.email}
                      label="Email"
                      leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                      errorMessage={errors.email}
                      errorStyle={{color: 'red'}}
                    />
                  </View>
                  <View style={commonStyle.fullWidth}>
                    <Input
                      onChangeText={handleChange('password')}
                      secureTextEntry={true}
                      placeholder="***************"
                      value={values.password}
                      label="Password"
                      leftIcon={{type: 'font-awesome', name: 'lock'}}
                      errorMessage={errors.password}
                      errorStyle={{color: 'red'}}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      onPress={handleSubmit}
                      title="login"
                      style={styles.button}
                      loading={loading}
                    />
                    <Button
                      onPress={() => navigation.push(screens.register)}
                      title="register"
                      style={styles.button}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const mapDispatchToProp = dispatch =>
  bindActionCreators(
    {fetchUser, fetchUserPosts, fetchUserFollowingPosts},
    dispatch,
  );

export default connect(null, mapDispatchToProp)(LoginScreen);

const styles = StyleSheet.create({
  headerContainer: {flex: 1, justifyContent: 'center'},
  headerText: {},
  formContainer: {width: '100%', flex: 3},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {width: 100},
});
