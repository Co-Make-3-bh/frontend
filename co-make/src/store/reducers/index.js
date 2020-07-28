import { combineReducers } from "redux";
import concernsReducer from "./concernsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({ concernsReducer, userReducer });

export default rootReducer;
