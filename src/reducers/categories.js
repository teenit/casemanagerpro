// reducer.js
import { SET_CATEGORIES } from '../actions/categories';

const initialState = {
  categories: [],
  case:[],
  help:{},
  groups:{}
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        case: [...state.case, ...action.payload.case],
        help: {...state.help, ...action.payload.help},
        groups:{...state.groups, ...action.payload.groups}
      };
    default:
      return state;
  }
};

export default categoriesReducer;
