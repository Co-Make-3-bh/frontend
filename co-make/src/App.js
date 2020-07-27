import React, { useState } from 'react';
import Form from './components/SignIn/form.jsx';
import Users from './components/SignIn/users.jsx';
import './App.css';
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";

function App() {

  const [users, setUsers] = useState([]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>App</h1>
        <HomePage />
      </header>
      <Switch>
        <Route path="/home" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
