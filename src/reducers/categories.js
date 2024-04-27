import { SET_CATEGORIES } from './../actions/categories';

const initialState = {
  data:[]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CATEGORIES:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;