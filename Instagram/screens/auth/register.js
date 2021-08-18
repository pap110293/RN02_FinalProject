import {Formik} from 'formik';
import React from 'react';
import {View, Text, SafeAreaView, TextInput, Button, Alert} from 'react-native';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';

import commonStyle from '../../styles/commonStyles';
import firestoreCollections from '../../firebase/firestoreCollections';
import {createUserWithEmailAndPassword} from '../../firebase/authService';

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .max(12, 'Password Too Long!')
    .required('Password is required'),
  name: Yup.string(),
});

export default function RegisterScreen() {
  const handleSubmitFormik = values => {
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
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Alert', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Alert', 'That email address is invalid!');
        }
      });
  };

  return (
    <SafeAreaView style={commonStyle.screen}>
      <Text>Register</Text>
      <Formik
        validationSchema={registerSchema}
        initialValues={{email: '', password: '', name: ''}}
        onSubmit={handleSubmitFormik}>
        {({values, handleSubmit, handleChange, errors}) => (
          <>
            <View>
              <Text>Username</Text>
              <TextInput
                onChangeText={handleChange('email')}
                placeholder="email@abcd.com"
                value={values.email}
              />

              {errors.email && <Text>{errors.email}</Text>}
            </View>
            <View>
              <Text>Password</Text>
              <TextInput
                placeholder="******"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              {errors.password && <Text>{errors.password}</Text>}
            </View>
            <View>
              <Text>Name</Text>
              <TextInput
                onChangeText={handleChange('name')}
                value={values.name}
              />
              {errors.name && <Text>{errors.name}</Text>}
            </View>
            <View>
              <Button onPress={handleSubmit} title="register"></Button>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}
