import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faAngleUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { fetchConcerns, addUpvote, zipSearch } from "../store/actions";

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
  background-color: #e5ebed;
  display: flex;
  width: 45%;
  margin: 0 auto;
  padding: 2%;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  div {
    min-width: 20%;
    text-align: left;
  }
`;

const Search = styled.input`
  width: 50%;
  border-radius: 20px;
  border: none;
  padding: 0.5%;
  margin: 0 auto;
`;

const Form = styled.form`
  position: absolute;
  width: 100%;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: relative;
  right: 25px;
  top: 2px;
`;

const HomePage = () => {
  const [searchBy, setSearchBy] = useState("");
  const dispatch = useDispatch();
  const { concerns } = useSelector((state) => state.concernsReducer);
  const { user, userLikes } = useSelector((state) => state.userReducer);
  // console.log(user);
  console.log(userLikes);
  console.log(concerns);
  useEffect(() => {
    dispatch(fetchConcerns());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(zipSearch(searchBy));
    setSearchBy("");
  };

  const handleChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <div>
      <h1>HomePage</h1>
      <Form onSubmit={handleSearch}>
        <Search
          type="text"
          name="search"
          value={searchBy}
          placeholder="Enter zip code to find issues in your area"
          onChange={handleChange}
        ></Search>
        <SearchIcon onClick={handleSearch} icon={faSearch} />
      </Form>
      {concerns.map((concern) => {
        return (
          <StyledIssue key={concern.id}>
            <UpVotes>
              <p>{concern.upvotes}</p>
              <FontAwesomeIcon
                className="upvote"
                onClick={() => {
                  console.log("Homepage 96", concern.id);
                  if (userLikes.length) {
                    if (!userLikes.some((el) => el.concern_id === concern.id)) {
                      dispatch(addUpvote(user.id, concern.id));
                    }
                  } else {
                    dispatch(addUpvote(user.id, concern.id));
                  }
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
