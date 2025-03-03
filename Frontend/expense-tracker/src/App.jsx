import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom"; // Removed Router
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Home from "../Pages/Dashboard/Home";
import Income from "../Pages/Dashboard/Income";
import Expense from "../Pages/Dashboard/Expense";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Home />}></Route>
        <Route path="/income" element={<Income />}></Route>
        <Route path="/expense" element={<Expense />}></Route>
      </Routes>
    </div>
  );
}

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
