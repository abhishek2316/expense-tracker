import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../../utils/helper";
import { API_PATHS } from "../../../utils/apiPath";
import  axiosInstance from "../../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please Enter a valid Email!");
      return;
    }

    if (!password) {
      setError("Please Enter Your Password");
      return
    }
    setError("");

    // Login API
    try{
      // console.log(API_PATHS.AUTH.LOGIN);
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      
      // console.log(response);
      
      
      const {token, user} = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error){

      
      if(error.message && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wroung.")
      }
    }
    
  };

  
  return (
    <div>
      <AuthLayout>
        <div className="h-16/4 flex justify-center flex-col items-center my-8">
          <div className="md:w-[60%] px-[25px] py-[35px] rounded-2xl shadow-2xl shadow-violet-500">
            <h1 className="text-2xl">Welcome Back</h1>
            <p className="text-sm mb-7">please enter your login details</p>
            <form onSubmit={handleLogin}>
              <Input
                value={email}
                label="Email"
                placeholder="email@googl.com"
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
                type="text"
              />
              <Input
                value={password}
                label="Password"
                placeholder="Your Password"
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
                type="password"
              />
              {error && <p className="text-red-500 text-sm pb-.5">{error}</p>}
              <button type="submit" className="btn-primary">
                LOGIN
              </button>
              <p className="text-[15px] text-slate-800 mt-3">
                Don't have Account ?{" "}
                <Link
                  className="font-medium text-primary underline"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </AuthLayout>
      {/* <div>
      <SignUp/>
      </div> */}
        
    </div>
  );
};

export default Login;
