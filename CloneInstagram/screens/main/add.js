import React from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';

import commonStyle from '../../styles/commonStyles';

const AddScreen = () => {
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording},
    {toggleFacing, touchToFocus, facesDetected, takePicture},
  ] = useCamera(null);

  const takePictureHandler = async () => {
    try {
      const data = await takePicture();
      const filePath = data.uri;
      const newFilePath = RNFS.PicturesDirectoryPath;
      console.log(filePath);
      console.log(newFilePath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={commonStyle.screen}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{flex: 1}}
        autoFocus={autoFocus}
        onFacesDetected={facesDetected}
      />

      {/* <TouchableWithoutFeedback
        style={{
          flex: 1,
        }}
        onPress={touchToFocus}
      />

      <TouchableOpacity
        testID="button"
        onPress={toggleFacing}
        style={{width: '100%', height: 45}}>
        {type}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={takePictureHandler}
        style={{width: '100%', height: 45}}
      /> */}
      {/* {!isRecording && (
        <TouchableOpacity
          onPress={async () => {
            try {
              setIsRecording(true);
              const data = await recordVideo();
              console.warn(data);
            } catch (error) {
              console.warn(error);
            } finally {
              setIsRecording(false);
            }
          }}
          style={{width: '100%', height: 45}}
        />
      )} */}
    </View>
  );
};

export default AddScreen;
