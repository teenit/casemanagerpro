// reducer.js
import { SET_AUTH_USER, SET_USER_PERM } from '../actions/auth';

const initialState = {
    loading: true,
    auth: false
};

const authReducer = (state = initialState, action) => {
    console.log(action.payload)
  switch (action.type) {
    case SET_USER_PERM:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        auth: action.payload.status
      };
    case SET_AUTH_USER:
      return {
        ...state,
        ...action.payload.data.auth,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
