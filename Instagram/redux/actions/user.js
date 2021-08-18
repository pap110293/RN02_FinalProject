import {getCurrentUserId} from '../../firebase/authService';
import {getUser, getUserPosts} from '../../firebase/firestoreService';
import {mapFirestoreObjectToData} from '../../utils/mapUtils';

export const USER_STATE_CHANGE = 'USER_STATE_CHANGE';
export const USER_POST_STATE_CHANGE = 'USER_POST_STATE_CHANGE';

export const fetchUser = uid => {
  return dispatch => {
    const userId = uid ?? getCurrentUserId();
    getUser(userId).then(snapshot => {
      if (snapshot.exists) {
        dispatch({type: USER_STATE_CHANGE, payload: snapshot.data()});
      } else {
        console.warn('does not exist');
      }
    });
  };
};

export const fetchUserPosts = uid => {
  return dispatch => {
    const userId = uid ?? getCurrentUserId();

    getUserPosts(userId)
      .then(snapshot => {
        const userPosts = snapshot.docs.map(mapFirestoreObjectToData);
        dispatch({type: USER_POST_STATE_CHANGE, payload: userPosts});
      })
      .catch(error => {
        console.warn(error);
      });
  };
};
