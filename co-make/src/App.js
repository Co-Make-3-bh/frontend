import React, { useState } from 'react';
import Form from './components/SignIn/form.jsx';
import Users from './components/SignIn/users.jsx';
import IssueForm from './components/PostIssue/issueForm.jsx';
import './App.css';
import { Route, Switch, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from './components/SignUp'
import styled from 'styled-components'

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1{
    margin: 20px;
  }
  .linkDiv{
    margin: 20px;
    .link{
      margin-left: 10px;
      color: black;
      text-decoration: none;
    } 
  }
`

function App() {

  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);

  return (
    <div className="App">
      <header >
        <StyledNav>
          <h1>Co-Make</h1>
          <div className='linkDiv'>
            <Link className='link' to = '/postissue'>Post New Issue</Link>
            <Link className='link' to = '/signin'>Sign In</Link>
            <Link className='link' to='/signup'>Sign Up</Link>
            <Link className='link' to='/'>Home</Link>
          </div>
        </StyledNav>
      </header>
      
      <Switch>
        <Route path = '/postissue'>
          <IssueForm setIssues={setIssues} issues={issues}/>
        </Route>

        <Route path = '/signin'>
          <Form setUsers={setUsers} users={users}/>
          <Users users={users} />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
