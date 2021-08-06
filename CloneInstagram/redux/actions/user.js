import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import firestoreCollections from '../../firebase/firestoreCollections';

export const USER_STATE_CHANGE = 'USER_STATE_CHANGE';

export const fetchUser = () => {
  return dispatch => {
    firestore()
      .collection(firestoreCollections.user)
      .doc(auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          dispatch({type: USER_STATE_CHANGE, payload: snapshot.data()});
        } else {
          console.log('does not exist');
        }
      });
  };
};
