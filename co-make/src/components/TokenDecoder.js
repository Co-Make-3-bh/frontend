import React from "react";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { refreshPage } from "../store/actions";

const TokenDecoder = () => {
  const dispatch = useDispatch();
  let token = jwt.decode(localStorage.getItem("token"));

  if (token) {
    if (token.exp * 1000 > Date.now()) {
      console.log("log in is not expired");
      dispatch(refreshPage);
    } else {
      console.log("log in is expired");
      localStorage.removeItem("token");
    }
    dispatch(refreshPage);
  } else {
    localStorage.removeItem("token");
  }

  return <></>;
};

export default TokenDecoder;
