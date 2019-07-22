import {
  IS_LOADING,
  IS_COMPLETE,
} from '../actions/loader';

const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case IS_LOADING:
    return { ...state, ...action.data };
  case IS_COMPLETE:
    return { ...state, ...action.data };
  default:
    return state;
  }
};
