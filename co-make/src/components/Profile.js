import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userConcerns } from "../store/actions";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userConcerns(0, 0));
  }, []);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
