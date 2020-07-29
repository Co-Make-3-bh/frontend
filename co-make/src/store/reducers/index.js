import {
  FETCH_CONCERNS_START,
  FETCH_CONCERNS_SUCCESS,
  FETCH_CONCERNS_FAILURE,
  ZIP_SEARCH_START,
  ZIP_SEARCH_SUCCESS,
  ZIP_SEARCH_FAILURE,
  ADD_UPVOTE_START,
  ADD_UPVOTE_SUCCESS,
  ADD_UPVOTE_FAILURE,
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
  EDIT_CONCERN_START,
  EDIT_CONCERN_SUCCESS,
  EDIT_CONCERN_FAILURE,
} from "../actions";

export const initialState = {
  concerns: [],
  userConcerns: [],
  isFetching: false,
  isUpdating: false,
  isDeleting: false,
  error: "",
  message: "",
  concern: {
    id: "",
    title: "",
    description: "",
    upvotes: "",
    createdBy: "",
    zip: "",
  },
  user: {
    id: "",
    username: "",
    email: "",
    zip: "",
  },
  userLikes: [],
  isLoggingIn: false,
  isRegistering: false,
  isLoading: false,
  isAdding: false,
  editing: false,
  usersConcerns: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONCERNS_START:
      return { ...state, isFetching: true, error: "" };
    case FETCH_CONCERNS_SUCCESS:
      return { ...state, isFetching: false, concerns: action.payload };
    case FETCH_CONCERNS_FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    case ADD_UPVOTE_START:
      return { ...state, isUpdating: true, error: "" };
    case ADD_UPVOTE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        concerns: state.concerns.map((concern) => {
          if (concern.id === action.payload.data.id) {
            return action.payload.data;
          }
          return concern;
        }),
        userLikes: action.payload.liked,
      };
    case ADD_UPVOTE_FAILURE:
      return { ...state, isUpdating: false, error: action.payload };
    case ZIP_SEARCH_START:
      return { ...state, isFetching: true, error: "" };
    case ZIP_SEARCH_SUCCESS:
      return { ...state, isFetching: false, concerns: action.payload };
    case ZIP_SEARCH_FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    case LOGIN_USER_START:
      return { ...state, isLoggingIn: true, error: "", message: "" };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.payload.data,
        userLikes: action.payload.liked,
      };
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
    case EDIT_CONCERN_START:
      return { ...state, isEditing: true, error: "" };
    case EDIT_CONCERN_SUCCESS:
      return {
        ...state,
        isEditing: false,
        usersConcerns: state.usersConcerns.map((concern) => {
          if (concern.id === action.payload.id) {
            return action.payload;
          }
          return concern;
        }),
      };
    case EDIT_CONCERN_FAILURE:
      return { ...state, isEditing: false, error: action.payload };
    default:
      return state;
  }
};
