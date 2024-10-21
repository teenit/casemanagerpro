// reducer.js

import { SET_FIELDS } from "../actions/fields";

const initialState = {
  users: {
    contacts:[],
    works:[],
    another:[]
  },
  cases:{
    contacts:[],
    works:[],
    another:[]
  },
};

const fieldsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELDS:
      return {
        ...state,
        cases: {...state.cases, ...action.payload.cases},
        users: {...state.users, ...action.payload.users},
      };
    default:
      return state;
  }
};

export default fieldsReducer;
