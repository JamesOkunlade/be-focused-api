import { 
  SIGNUP_SUCCESS, 
  SIGNUP_FAILURE, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT
} from '../actions';

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };

    default:
      return state;
  }
};

export default reducer;
