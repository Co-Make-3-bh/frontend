import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from "../actions";

export const initialState = {
  user: {
    id: "",
    username: "",
    email: "",
    zip: "",
  },
  isLoggingIn: false,
  isRegistering: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return { ...state, isLoggingIn: true, error: "" };
    case LOGIN_USER_SUCCESS:
      return { ...state, isLoggingIn: false, user: action.payload };
    case LOGIN_USER_FAILURE:
      return { ...state, isLoggingIn: false, error: action.payload };
    case REGISTER_USER_START:
      return { ...state, isRegistering: true, error: "" };
    case REGISTER_USER_SUCCESS:
      return { ...state, isRegistering: false, user: action.payload };
    case REGISTER_USER_FAILURE:
      return { ...state, isRegistering: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
