import {Formik} from 'formik';
import React from 'react';
import {View, Text, Button, TextInput, SafeAreaView} from 'react-native';
import * as Yup from 'yup';
import screens from '..';
import auth from '@react-native-firebase/auth';

import commonStyle from '../../styles/commonStyles';

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .max(12, 'Password Too Long!')
    .required('Password is required'),
});

export default function Login({navigation}) {
  const handleSubmitFormik = values => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .catch(error => console.log(error));
  };

  return (
    <SafeAreaView style={commonStyle.screen}>
      <Text>Login screen</Text>
      <Formik
        validationSchema={loginSchema}
        initialValues={{email: '', password: ''}}
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
              <Button onPress={handleSubmit} title="login"></Button>
              <Button
                onPress={() => navigation.push(screens.register.name)}
                title="register"></Button>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}
