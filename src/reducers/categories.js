// reducer.js
import { SET_CATEGORIES } from '../actions/categories';

const initialState = {
  categories: [],
  case:[],
  help:[]
};

const categoriesReducer = (state = initialState, action) => {
    console.log(action)
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        case: [...state.case, ...action.payload.case],
        help: [...state.help, ...action.payload.help],
      };
    default:
      return state;
  }
};

export default categoriesReducer;
