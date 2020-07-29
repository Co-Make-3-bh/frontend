import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faAngleUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { fetchConcerns, addUpvote, zipSearch } from "../store/actions";

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
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchConcerns());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault()
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
