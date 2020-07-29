import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { fetchConcerns, addUpvote } from "../store/actions";

const UpVotes = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  

  .upvote {
    &:hover {
      cursor: pointer;
    }
  }
`;
const StyledIssue = styled.div`
  background-color: #E5EBED;
  display: flex;
  width: 45%;
  margin: 0 auto;
  padding: 2%;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  div{
    min-width: 20%;
    text-align: left;
    
  }
`

const HomePage = () => {
  const dispatch = useDispatch();
  const { concerns } = useSelector((state) => state.concernsReducer);
  const { user } = useSelector((state) => state.userReducer);
  console.log(concerns);
  useEffect(() => {
    dispatch(fetchConcerns());
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      {concerns.map((concern) => {
        console.log(concern);
        return (
          <StyledIssue key={concern.id}>
            <UpVotes>
              <p>{concern.upvotes}</p>
              <FontAwesomeIcon
                className="upvote"
                onClick={() => {
                  dispatch(addUpvote(concern.id));
                }}
                icon={faAngleUp}
              />
            </UpVotes>
            <div>
            <h2>{concern.title}</h2>
            <p>{concern.description}</p>
            <p>{concern.zip}</p>
            </div>
          </StyledIssue>
        );
      })}
    </div>
  );
};

export default HomePage;
