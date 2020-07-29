import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { fetchConcerns, addUpvote } from "../store/actions";

const UpVotes = styled.div`
  width: 3%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;

  .upvote {
    &:hover {
      cursor: pointer;
    }
  }
`;

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
          <div key={concern.id}>
            <h2>{concern.title}</h2>
            <p>{concern.description}</p>
            <p>{concern.zip}</p>
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
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
