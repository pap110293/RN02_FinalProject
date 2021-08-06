import {USER_STATE_CHANGE} from '../actions/user';

const initialState = {
  currentUser: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {...state, currentUser: action.payload};

    default:
      return state;
  }
};