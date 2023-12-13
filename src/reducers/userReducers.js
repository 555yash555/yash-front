export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, message: "User registered Successfully!" };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "RESET_USER_DETAILS":
      return { user: {} };
    default:
      return state;
  }
};

export const getMyPosts = (state = {}, action) => {
  switch (action.type) {
    case "GET_MY_POSTS_REQUEST":
      return { ...state, loading: true };
    case "GET_MY_POSTS_SUCCESS":
      return { loading: false, posts: action.payload };
    case "GET_MY_POSTS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addMyBio = (state = {}, action) => {
  switch (action.type) {
    case "ADD_MY_BIO_REQUEST":
      return { ...state, loading: true };
    case "ADD_MY_BIO_SUCCESS":
      return { loading: false, bio: action.payload };
    case "ADD_MY_BIO_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addMyProfile = (state = {}, action) => {
  switch (action.type) {
    case "ADD_MY_PROFILE_REQUEST":
      return { ...state, loading: true };
    case "ADD_MY_PROFILE_SUCCESS":
      return { loading: false, profile: action.payload };
    case "ADD_MY_PROFILE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// userReducers.js

const initialState = {
  user: {},
  error: null,
};

export const userSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_USER_SUCCESS':
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.length > 0 ? action.payload : {},
        error1: action.payload.length > 0 ? null : "no users found",
      };
    case 'SEARCH_USER_FAIL':
      return {
        ...state,
        user: {},
        error1: action.payload,
      };
    default:
      return state;
  }
};

