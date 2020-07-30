import React from "react";
import Form from "./components/SignIn/form.jsx";

import IssueForm from "./components/PostIssue/issueForm.jsx";

import Issue from "./components/PostIssue/issue";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp/SignUp";
import styled from "styled-components";
import TokenDecoder from "./components/TokenDecoder";


const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Quicksand", sans-serif;
  border-bottom: 1px solid #9fb3b5;
  width:100%;
  background-color:#2B85A2;
  position: fixed;
  top: 0;
 

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
    width: 35%;
    .link {
      padding: 2%;
      margin-left: 10px;
      color: white;
      text-decoration: none;
      font-size: 1.2rem;

      &:hover {
        transition: 0.7s;
        color: black;
      }
    }
  }
`;

function App() {
  const { push } = useHistory();
  const handleSignOut = () => {
    push("/");
    localStorage.removeItem("token");
  };
  return (
    <div className="App">
      <TokenDecoder />
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
        <PrivateRoute path="/home" component={HomePage} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/issue/:id" component={Issue} />
        <Route path="/postissue">
          <IssueForm />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        {/* <Route path="/home" component={HomePage} />
        <Route path="/profile" component={Profile} /> */}
        <Route path="/" component={Form} />
      </Switch>
    </div>
  );
}

export default App;
