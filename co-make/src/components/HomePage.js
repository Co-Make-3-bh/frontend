import React, { useEffect } from "react";
import { fetchConcerns } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConcerns());
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
};

export default HomePage;
