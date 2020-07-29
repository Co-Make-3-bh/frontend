import {
  FETCH_CONCERNS_START,
  FETCH_CONCERNS_SUCCESS,
  FETCH_CONCERNS_FAILURE,
  FETCH_CONCERN_START,
  FETCH_CONCERN_FAILURE,
  FETCH_CONCERN_SUCCESS,
} from "../actions";

export const initialState = {
  concerns: [],
  userConcerns: [],
  isFetching: false,
  isEditing: false,
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
    default:
      return state;
  }
};

export default concernsReducer;
