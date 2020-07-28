import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userConcerns } from "../store/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  console.log(user);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
