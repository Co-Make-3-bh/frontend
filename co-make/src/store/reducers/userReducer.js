import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGOUT_USER_START,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  USER_CONCERNS_START,
  USER_CONCERNS_SUCCESS,
  USER_CONCERNS_FAILURE,
  ADD_CONCERN_START,
  ADD_CONCERN_SUCCESS,
  ADD_CONCERN_FAILURE,
  DELETE_CONCERN_FAILURE,
  DELETE_CONCERN_START,
  DELETE_CONCERN_SUCCESS,
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
  isLoading: false,
  isAdding: false,
  error: "",
  message: "",
  usersConcerns: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return { ...state, isLoggingIn: true, error: "", message: "" };
    case LOGIN_USER_SUCCESS:
      return { ...state, isLoggingIn: false, user: action.payload };
    case LOGIN_USER_FAILURE:
      return { ...state, isLoggingIn: false, error: action.payload };
    case REGISTER_USER_START:
      return { ...state, isRegistering: true, error: "", message: "" };
    case REGISTER_USER_SUCCESS:
      return { ...state, isRegistering: false, user: action.payload };
    case REGISTER_USER_FAILURE:
      return { ...state, isRegistering: false, error: action.payload };
    case LOGOUT_USER_START:
      return { ...state, isLoggingOut: true, error: "", message: "" };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        user: { id: "", username: "", email: "", zip: "" },
        message: action.payload,
      };
    case LOGOUT_USER_FAILURE:
      return { ...state, isLoggingOut: false, error: action.payload };
    case USER_CONCERNS_START:
      return { ...state, isLoading: true, error: "", message: "" };
    case USER_CONCERNS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersConcerns: action.payload,
      };
    case USER_CONCERNS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case ADD_CONCERN_START:
      return { ...state, isAdding: true, error: "", message: "" };
    case ADD_CONCERN_SUCCESS:
      return {
        ...state,
        isAdding: false,
        message: "Concern successfully added!",
      };
    case ADD_CONCERN_FAILURE:
      return {
        ...state,
        isAdding: false,
        error: action.payload,
      };
    case DELETE_CONCERN_START:
      return { ...state, isDeleting: true, error: "", message: "" };
    case DELETE_CONCERN_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        usersConcerns: state.usersConcerns.filter(
          (concern) => concern.id !== action.payload
        ),
      };
    case DELETE_CONCERN_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: "Something went wrong. Please try again.",
      };
    default:
      return state;
  }
};

export default userReducer;
