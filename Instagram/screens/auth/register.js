import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import {Input, Text, Button} from 'react-native-elements';

import commonStyle from '../../styles/commonStyles';
import firestoreCollections from '../../firebase/firestoreCollections';
import {createUserWithEmailAndPassword} from '../../firebase/authService';
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowingPosts,
} from '../../redux/actions/user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .required('Password is required'),
  name: Yup.string().required(),
});

function RegisterScreen({fetchUser, fetchUserPosts, fetchUserFollowingPosts}) {
  const [loading, setLoading] = useState(false);

  const handleSubmitFormik = values => {
    setLoading(true);
    createUserWithEmailAndPassword(values.email, values.password)
      .then(async result => {
        await firestore()
          .collection(firestoreCollections.users)
          .doc(result.user.uid)
          .set({
            email: values.email,
            name: values.name,
            normalizedName: values.name.toLowerCase(),
          });
        fetchUser();
        fetchUserPosts();
        fetchUserFollowingPosts();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Opps', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Opps', 'That email address is invalid!');
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
              Register
            </Text>
          </View>
          <Formik
            validationSchema={registerSchema}
            initialValues={{email: '', password: '', name: ''}}
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
                  <View style={commonStyle.fullWidth}>
                    <Input
                      onChangeText={handleChange('name')}
                      placeholder="Your name"
                      value={values.name}
                      label="Name"
                      leftIcon={{type: 'font-awesome', name: 'user-o'}}
                      errorMessage={errors.name}
                      errorStyle={{color: 'red'}}
                      returnKeyLabel="Register"
                      returnKeyType="go"
                      onSubmitEditing={handleSubmit}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      onPress={handleSubmit}
                      title="register"
                      style={styles.button}
                      loading={loading}
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

export default connect(null, mapDispatchToProp)(RegisterScreen);

const styles = StyleSheet.create({
  headerContainer: {flex: 1, justifyContent: 'center'},
  headerText: {},
  formContainer: {width: '100%', flex: 3},
  buttonContainer: {alignItems: 'center'},
  button: {width: 100},
});
