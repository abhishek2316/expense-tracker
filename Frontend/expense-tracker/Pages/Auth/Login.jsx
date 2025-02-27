import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleLogin = async (e) => {};
  return (
    <>
      <AuthLayout>
        <div className="h-4/4 flex justify-center flex-col">
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
              <Link className="font-medium text-primary underline" to="/signup">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
