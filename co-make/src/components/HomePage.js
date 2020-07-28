import React, { useEffect } from "react";
import { fetchConcerns } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const { concerns } = useSelector((state) => state.concernsReducer);
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(fetchConcerns());
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      {concerns.map((concern) => {
        console.log(concern);
        return (
          <div key={concern.id}>
            <h2>{concern.title}</h2>
            <p>{concern.description}</p>
            <p>{concern.zip}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
