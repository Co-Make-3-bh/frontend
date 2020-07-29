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
};

const concernsReducer = (state = initialState, action) => {
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
          if (concern.id === action.payload.id) {
            return action.payload;
          }
          return concern;
        }),
      };
    case ADD_UPVOTE_FAILURE:
      return { ...state, isUpdating: false, error: action.payload };
    case ZIP_SEARCH_START:
      return { ...state, isFetching: true, error: "" };
    case ZIP_SEARCH_SUCCESS:
      return { ...state, isFetching: false, concerns: action.payload };
    case ZIP_SEARCH_FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};

export default concernsReducer;
