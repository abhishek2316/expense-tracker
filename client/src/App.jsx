import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom"; // Removed Router
import Login from "../src/Pages/Auth/Login";
import SignUp from "../src/Pages/Auth/SignUp";
import Home from "../src/Pages/Dashboard/Home";
import Income from "../src/Pages/Dashboard/Income";
import Expense from "../src/Pages/Dashboard/Expense";
import UserProvider  from "./context/userContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
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

      <Toaster
        toasterOptions={{
          // className="",
          style: {
            fontSize: '13px'
          },
        }}
      />  
    </UserProvider>
  );
}

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
