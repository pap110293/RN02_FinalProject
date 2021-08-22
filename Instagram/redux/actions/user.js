import {getCurrentUserId} from '../../firebase/authService';
import {
  getUser,
  getUserFollowings,
  getUserPosts,
} from '../../firebase/firestoreService';
import {mapFirestoreObjectToData} from '../../utils/mapUtils';

export const USER_STATE_CHANGE = 'USER_STATE_CHANGE';
export const USER_POST_STATE_CHANGE = 'USER_POST_STATE_CHANGE';
export const USER_FOLLOWING_POST_STATE_CHANGE =
  'USER_FOLLOWING_POST_STATE_CHANGE';

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

export const fetchUserFollowingPosts = () => {
  return dispatch => {
    getUserFollowings().then(docs => {
      if (!docs.empty) {
        const data = docs.docs;
        const tasks = [];
        let posts = [];

        const handleUserPostDocs = userPostDocs => {
          if (!userPostDocs.empty) {
            const userPosts = userPostDocs.docs.map(p => {
              const postData = p.data();
              return {...postData, id: p.id};
            });
            posts = [...posts, ...userPosts];
          }
        };

        for (let i = 0; i < data.length; i++) {
          const userId = data[i].id;
          tasks.push(getUserPosts(userId).then(handleUserPostDocs));
        }
        Promise.all(tasks).then(() => {
          dispatch({
            type: USER_FOLLOWING_POST_STATE_CHANGE,
            payload: posts.sort(
              (a, b) => a.creation.toDate() - b.creation.toDate(),
            ),
          });
        });
      }
    });
  };
};
