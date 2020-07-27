import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";

function App() {
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
