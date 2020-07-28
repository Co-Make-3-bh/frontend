import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userConcerns } from "../store/actions";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Issue from "./PostIssue/issue";

const List = styled.ul`
  padding-left: 0;
`;

const ListItem = styled.li`
  list-style: none;
`;

const Profile = () => {
  
  const dispatch = useDispatch();
  const { user, usersConcerns } = useSelector((state) => state.userReducer);
  console.log(user);
  console.log(usersConcerns);
  useEffect(() => {
    dispatch(userConcerns(user.id));
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome back, {user.username}</h2>
      {usersConcerns.length > 0 ? (
        <>
          <h3>Here is what you have added.</h3>
          <List>
            {usersConcerns.map(
              (concern) => (
                <ListItem>
                  <Link
                    to={{ pathname: `/issue/${concern.id}`, state: concern }}
                    key={concern.id}
                  >
                    {concern.title}
                  </Link>
                </ListItem>
              )
              //
            )}
          </List>
        </>
      ) : (
        <h3>
          You currently don't have any concerns about your community posted.
        </h3>
      )}
      <h3>
        Post an issue <Link to="/postissue">here</Link>
      </h3>
    </div>
  );
};

export default Profile;
