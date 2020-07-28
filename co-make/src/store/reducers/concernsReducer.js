import {
  FETCH_CONCERNS_START,
  FETCH_CONCERNS_SUCCESS,
  FETCH_CONCERNS_FAILURE,
  FETCH_CONCERN_START,
  FETCH_CONCERN_FAILURE,
  FETCH_CONCERN_SUCCESS,
  EDIT_CONCERN_START,
  EDIT_CONCERN_SUCCESS,
  EDIT_CONCERN_FAILURE,
  DELETE_CONCERN_FAILURE,
  DELETE_CONCERN_START,
  DELETE_CONCERN_SUCCESS,
} from "../actions";

export const initialState = {
  concerns: [],
  userConcerns: [],
  isFetching: false,
  isEditing: false,
  isDeleting: false,
  error: "",
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
    case EDIT_CONCERN_START:
      return { ...state, isEditing: true, error: "" };
    case EDIT_CONCERN_SUCCESS:
      return {
        ...state,
        isEditing: false,
        concerns: state.concersns.map((concern) => {
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

export default concernsReducer;
