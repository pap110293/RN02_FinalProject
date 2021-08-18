import React from 'react';
import {View, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import commonStyle from '../../styles/commonStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useCamera} from 'react-native-camera-hooks';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import screens from '../index';

const AddScreen = ({navigation}) => {
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint},
    {toggleFacing, takePicture},
  ] = useCamera(null);

  const takePictureHandler = async () => {
    try {
      takePicture()
        .then(image => {
          ImagePicker.openCropper({cropping: true, path: image.uri})
            .then(i => {
              saveImage(i.path);
            })
            .catch(error => {
              console.warn(error);
            });
        })
        .catch(error => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  const selectImage = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then(image => {
        saveImage(image.path);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const saveImage = image => {
    navigation.push(screens.mains.save, {image});
  };

  return (
    <SafeAreaView style={commonStyle.flex1}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={commonStyle.flex1}
        autoFocus={autoFocus}>
        <TouchableOpacity
          testID="button"
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="keyboard-backspace" size={30} />
        </TouchableOpacity>
      </RNCamera>
      <View style={styles.buttonContainer}>
        <View style={styles.leftButtonContainer}>
          <TouchableOpacity testID="button" onPress={selectImage}>
            <Icon name="image" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerButtonContainer}>
          <TouchableOpacity onPress={takePictureHandler}>
            <Icon name="camera-alt" size={50} />
          </TouchableOpacity>
        </View>
        <View style={styles.rightButtonContainer}>
          <TouchableOpacity testID="button" onPress={toggleFacing}>
            <Icon name="flip-camera-ios" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },

  centerButtonContainer: {
    ...commonStyle.flex1,
    ...commonStyle.allCenter,
  },

  rightButtonContainer: {
    ...commonStyle.flex1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  leftButtonContainer: {
    ...commonStyle.flex1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
