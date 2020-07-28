import { combineReducers } from "redux";
import concernsReducer from "./concernsReducer";
import userReducer from "./userReducer";

import {
  FETCH_CONCERNS_START,
  FETCH_CONCERNS_SUCCESS,
  FETCH_CONCERNS_FAILURE,
} from "../../store/actions";

const rootReducer = combineReducers({ concernsReducer, userReducer });

export default rootReducer;
// export const initialState = {
//   user: {
//     id: "",
//     username: "",
//     email: "",
//     zip: "",
//   },
//   concerns: [],
//   isFetching: "",
//   error: "",
//   concern: {
//     id: "",
//     title: "",
//     description: "",
//     upvotes: "",
//     createdBy: "",
//     zip: "",
//   },
// };

// export const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_CONCERNS_START:
//       return { ...state, isFetching: true, error: "" };
//     case FETCH_CONCERNS_SUCCESS:
//       return { ...state, isFetching: false, concerns: action.payload };
//     case FETCH_CONCERNS_FAILURE:
//       return { ...state, isFetching: false, error: action.payload };
//     default:
//       return state;
//   }
// };
