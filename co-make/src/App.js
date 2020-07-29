import React, { useState } from "react";
import Form from "./components/SignIn/form.jsx";
import Users from "./components/SignIn/users.jsx";
import IssueForm from "./components/PostIssue/issueForm.jsx";
import Issues from "./components/PostIssue/issues";
import Issue from "./components/PostIssue/issue";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp/SignUp";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Quicksand", sans-serif;
  h1 {
    margin: 10px;
    font-size: 2.5rem;
    font-family: "Rock Salt", cursive;
    width: 20%;

    @media (max-width: 1000px) {
      width: 25%;
    }
  }
  .linkDiv {
    margin: 10px;
    width: 30%;
    .link {
      padding: 2%;
      margin-left: 10px;
      color: white;
      text-decoration: none;
      font-size: 1.2rem;

      &:hover {
        color: black;
      }
    }
  }
`;

function App() {
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);

  const { push } = useHistory();
  const handleSignOut = () => {
    push("/");
    localStorage.removeItem("token");
  };
  return (
    <div className="App">
      <header>
        <StyledNav>
          <h1>Co-Make</h1>
          <div className="linkDiv">
            <Link className="link" to="/profile">
              Profile
            </Link>
            <Link className="link" to="/">
              Sign In
            </Link>
            <Link className="link" to="/signup">
              Sign Up
            </Link>
            <Link className="link" to="/home">
              Home
            </Link>
            <Link className="link" to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </div>
        </StyledNav>
      </header>

      <Switch>
        <Route path="/issue/:id" component={Issue} />
        <Route path="/postissue">
          <IssueForm setIssues={setIssues} issues={issues} />
          <Issues issues={issues} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/home" component={HomePage} />
        <Route path="/profile" component={Profile} />
        <Route path="/">
          <Form setUsers={setUsers} users={users} />
          <Users users={users} />
        </Route>
        {/* <PrivateRoute path="/postissue" component={IssueForm} />
        <PrivateRoute path="/home" component={HomePage} />
        <PrivateRoute path="/profile" component={Profile} /> */}
      </Switch>
    </div>
  );
}

export default App;
