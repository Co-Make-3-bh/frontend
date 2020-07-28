import { axiosWithAuth } from "../../utils/axiosWithAuth";

//Fetch concerns for homepage...
export const FETCH_CONCERNS_START = "FETCH_CONCERNS_START";
export const FETCH_CONCERNS_SUCCESS = "FETCH_CONCERNS_SUCCESS";
export const FETCH_CONCERNS_FAILURE = "FETCH_CONCERNS_FAILURE";

//Login user...
export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

//Logout user...
export const LOGOUT_USER_START = "LOGOUT_USER_START";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";

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

//Edit concern...
export const EDIT_CONCERN_START = "EDIT_CONCERN_START";
export const EDIT_CONCERN_SUCCESS = "EDIT_CONCERN_SUCCESS";
export const EDIT_CONCERN_FAILURE = "EDIT_CONCERN_FAILURE";

//Delete concermn...
export const DELETE_CONCERN_START = "DELETE_CONCERN_START";
export const DELETE_CONCERN_SUCCESS = "DELETE_CONCERN_SUCCESS";
export const DELETE_CONCERN_FAILURE = "DELETE_CONCERN_FAILURE";

//User specific concerns...
export const USER_CONCERNS_START = "USER_CONCERNS_START";
export const USER_CONCERNS_SUCCESS = "USER_CONCERNS_SUCCESS";
export const USER_CONCERNS_FAILURE = "USER_CONCERNS_FAILURE";

export const fetchConcerns = () => (dispatch) => {
  dispatch({ type: FETCH_CONCERNS_START });
  axiosWithAuth()
    .get("/concerns")
    .then((res) => {
      dispatch({ type: FETCH_CONCERNS_SUCCESS, payload: res.data.data });
      console.log(res.data.data);
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
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data.data });
      localStorage.setItem("token", res.data.token);
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILURE });
      console.log(err.message);
    });
};

export const logoutUser = (dispatch) => {
  dispatch({ type: LOGOUT_USER_START }).then().catch();
  dispatch({ type: LOGOUT_USER_SUCCESS, payload: "Successfully logged out" });
  dispatch({
    type: LOGOUT_USER_FAILURE,
    payload: "Something went wrong. Please try again.",
  });
};

export const registerUser = (user) => (dispatch) => {
  dispatch({ type: REGISTER_USER_START });
  axiosWithAuth()
    .post("/auth/register", user)
    .then((res) => {
      dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data.data });
      localStorage.setItem("token", res.data.token);
      console.log(res.data.data);
    })
    .catch((err) => {
      dispatch({ type: REGISTER_USER_FAILURE });
      console.log(err);
    });
};

export const addConcern = (concern) => (dispatch) => {
  dispatch({ type: ADD_CONCERN_START });
  console.log(concern);
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

export const editConcern = (concern, id) => (dispatch) => {
  dispatch({ type: EDIT_CONCERN_START });
  axiosWithAuth()
    .put(`/concerns/${id}`, concern)
    .then((res) => {
      dispatch({ type: EDIT_CONCERN_SUCCESS });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: EDIT_CONCERN_FAILURE });
      console.log(err);
    });
};

export const deleteConcern = (id) => (dispatch) => {
  dispatch({ type: DELETE_CONCERN_START });
  axiosWithAuth()
    .delete(`/concerns/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_CONCERN_SUCCESS, payload: id });
      console.log(id);
    })
    .catch((err) => {
      dispatch({ type: DELETE_CONCERN_FAILURE });
      console.log(err);
    });
};

export const userConcerns = (userId) => (dispatch) => {
  dispatch({ type: USER_CONCERNS_START });
  axiosWithAuth()
    .get(`/concerns/createdBy/${userId}`)
    .then((res) => {
      dispatch({ type: USER_CONCERNS_SUCCESS, payload: res.data.data });
      console.log(res.data.data);
    })
    .catch((err) => {
      dispatch({ type: USER_CONCERNS_FAILURE });
      console.log(err);
    });
};
