import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../apis/AuthApi';
import { setAccessToken } from '../../utils/storage';
import { useDispatch } from 'react-redux';
import { LoginButton } from 'react-native-fbsdk-next';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('username không được bỏ trống'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .max(12, 'Password Too Long!')
    .required('Password không được bỏ trống'),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSubmitFormik = (values) => {
    login(values)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setAccessToken(res.data.token);
          dispatch({
            type: 'SET_ACCESS_TOKEN',
            payload: res.data.token,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginForm}>
        <Text>Login Form</Text>
        <Formik
          validationSchema={loginSchema}
          initialValues={{ username: '', password: '' }}
          onSubmit={handleSubmitFormik}
        >
          {({ values, handleSubmit, handleChange, errors }) => (
            <>
              <View style={styles.inputContainer}>
                <Text>Username</Text>
                <TextInput
                  style={[
                    styles.inputField,
                    errors.username && styles.inputError,
                  ]}
                  onChangeText={handleChange('username')}
                  placeholder='username'
                  value={values.username}
                />

                {errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text>Password</Text>
                <TextInput
                  style={[
                    styles.inputField,
                    errors.password && styles.inputError,
                  ]}
                  placeholder='******'
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleSubmit}
                >
                  <Text>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={() => navigation.push('SignupScreen')}
                >
                  <Text>Register</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginForm: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputField: {
    borderWidth: 1,
    padding: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
  signInButton: {
    backgroundColor: '#bffefe',
    padding: 8,
    width: '30%',
    alignItems: 'center',
  },
});

export default LoginScreen;
