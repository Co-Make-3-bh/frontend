import { axiosWithAuth } from "../../utils/axiosWithAuth";

//Fetch concerns for homepage...
export const FETCH_CONCERNS_START = "FETCH_CONCERNS_START";
export const FETCH_CONCERNS_SUCCESS = "FETCH_CONCERNS_SUCCESS";
export const FETCH_CONCERNS_FAILURE = "FETCH_CONCERNS_FAILURE";

//Login user...
export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

//Register user...
export const REGISTER_USER_START = "REGISTER_USER_START";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

//Add concern...
export const ADD_CONCERN_START = "ADD_CONCERN_START";
export const ADD_CONCERN_SUCCESS = "ADD_CONCERN_SUCCESS";
export const ADD_CONCERN_FAILURE = "ADD_CONCERN_FAILURE";

//Fetch individual concern...
export const FETCH_CONCERN_START = "FETCH_CONCERN_START";
export const FETCH_CONCERN_SUCCESS = "FETCH_CONCERN_SUCCESS";
export const FETCH_CONCERN_FAILURE = "FETCH_CONCERN_FAILURE";

export const fetchConcerns = () => (dispatch) => {
  dispatch({ type: FETCH_CONCERNS_START });
  axiosWithAuth()
    .get("/concerns")
    .then((res) => {
      dispatch({ type: FETCH_CONCERNS_SUCCESS, payload: res.data.data });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: FETCH_CONCERNS_FAILURE, payload: err.message });
      console.log(err);
    });
};

export const fetchConcern = (createdBy, concernID) => (dispatch) => {
  dispatch({ type: FETCH_CONCERN_START });
  axiosWithAuth()
    .get(`/concerns/${createdBy}/${concernID}`)
    .then((res) => {
      dispatch({ type: FETCH_CONCERN_SUCCESS });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: FETCH_CONCERN_SUCCESS });
      console.log(err);
    });
};

export const loginUser = (credentials) => (dispatch) => {
  dispatch({ type: LOGIN_USER_START });
  console.log(credentials);
  axiosWithAuth()
    .post("/auth/login", credentials)
    .then((res) => {
      dispatch({ type: LOGIN_USER_SUCCESS });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILURE });
      console.log(err.message);
    });
};

export const registerUser = (user) => (dispatch) => {
  dispatch({ type: REGISTER_USER_START });
  axiosWithAuth()
    .post("/auth/register", user)
    .then((res) => {
      dispatch({ type: REGISTER_USER_SUCCESS });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: REGISTER_USER_FAILURE });
      console.log(err);
    });
};

export const addConcern = (concern) => (dispatch) => {
  dispatch({ type: ADD_CONCERN_START });
  axiosWithAuth()
    .post("/concerns", concern)
    .then((res) => {
      dispatch({ type: ADD_CONCERN_SUCCESS });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: ADD_CONCERN_FAILURE });
      console.log(err);
    });
};
