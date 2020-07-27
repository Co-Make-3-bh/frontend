import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const FETCH_CONCERNS_START = "FETCH_CONCERNS_START";
export const FETCH_CONCERNS_SUCCESS = "FETCH_CONCERNS_SUCCESS";
export const FETCH_CONCERNS_FAILURE = "FETCH_CONCERNS_FAILURE";

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
