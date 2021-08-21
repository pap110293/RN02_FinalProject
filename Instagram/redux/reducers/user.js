import {
  USER_POST_STATE_CHANGE,
  USER_STATE_CHANGE,
  USER_FOLLOWING_POST_STATE_CHANGE,
} from '../actions/user';

const initialState = {
  currentUser: null,
  posts: [],
  followingPosts: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {...state, currentUser: action.payload};

    case USER_POST_STATE_CHANGE:
      return {...state, posts: action.payload};

    case USER_FOLLOWING_POST_STATE_CHANGE:
      return {...state, followingPosts: action.payload};
    default:
      return state;
  }
};
