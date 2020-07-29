import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userConcerns } from "../store/actions";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Issue from "./PostIssue/issue";



const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-decoration: none;

  h1{
    font-family: "Quicksand", sans-serif;
  }

  h2{
    font-family: "Quicksand", sans-serif;
  }

  h3{
    font-family: "Quicksand", sans-serif;
  }

  p {
    color: #9FB5BD;
    margin-top: 2%;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;
  }

  

  
`;
const StyledProfile = styled.div`
  background-color: #e5ebed;
  width: 50%;
  height: auto;
  padding: 2%;
  margin-top: 2%;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  
  flex-direction: column;

  align-items: left;

  .header{
    display:flex;
  }
  .title{
    width:80%;
    text-align:left;
    margin-left:2%;

    
  }
  .container{
    border-bottom: 1px solid black;
    
  }

  .details-container{
    text-align:left;
    margin:2%;
    margin-bottom:5%;

     .detail-text{
      font-family: "Quicksand", sans-serif;
      color:black;
  }

     }
  }

  .post-btn{

    button {
    width: 100%;
    background-color: #2b85a2;
    color: white;
    padding: 10px 10px;
    margin: 2%;
    margin-top: 22%;
    margin-left:10%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;

    .link{
      text-decoration: none;
    color: white;
    }
  }
    
  }
  @media (max-width: 1000px){
    width:45%;
  }

  
`;



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

  useEffect(() => {
    dispatch(userConcerns(user.id));
  }, []);
  console.log(usersConcerns);
  return (
    <ProfileContainer>
   
      <StyledProfile>
    <div className = 'header'>

      <div className ='title'> 
      <h1>Welcome back, {user.username}</h1>
      </div>

      <div className = 'post-btn'>
       <button><Link className ='link'to="/postissue">Post New Issue</Link></button>
      </div>

      </div>

      <div className = 'container'>
        <div className = 'details-container'>
      <h2>User Details</h2>
      <p>Username:</p>
      <p className ='detail-text'>{user.username}</p>
      <p>Email:</p>
      <p className ='detail-text'>{user.email}</p>
      <p>Zip Code:</p>
      <p className ='detail-text'>{user.zip}</p>

        </div>
        
      </div>
      {usersConcerns.length > 0 ? (
        <>
          <h3>Here is what you have added.</h3>
          <List>
            {usersConcerns.map(
              (concern) => (
                <ListItem key={concern.id}>
                  <Link
                    to={{ pathname: `/issue/${concern.id}`, state: concern }}
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
     
      </StyledProfile>
    
    </ProfileContainer>
  );
};

export default Profile;
