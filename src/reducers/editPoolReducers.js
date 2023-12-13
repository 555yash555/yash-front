import {
    POOL_EDIT_REQUEST,
    POOL_EDIT_SUCCESS,
    POOL_EDIT_FAIL,
  } from '../actions/poolActions';
  
  export const editPoolReducer = (state = {}, action) => {
    switch (action.type) {
      case POOL_EDIT_REQUEST:
        return { loading: true };
      case POOL_EDIT_SUCCESS:
        return { loading: false, success: true, pool: action.payload.updatedPool };
      case POOL_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };