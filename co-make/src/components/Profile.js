import React, { useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Profile = () => {
  useEffect(() => {axiosWithAuth().get()}, []);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
