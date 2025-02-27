import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Home from "../Pages/Dashboard/Home";
import Income from "../Pages/Dashboard/Income";
import Expense from "../Pages/Dashboard/Expense";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/signup" exact element={<SignUp />}></Route>
          <Route path="/dashboard" exact element={<Home />}></Route>
          <Route path="/income" exact element={<Income />}></Route>
          <Route path="/expense" exact element={<Expense />}></Route>
          <Route></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
