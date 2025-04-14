import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../../utils/helper";
import ProfileImageSelector from "../../components/Input/ProfileImageSelector";
import { API_PATHS } from "../../../utils/apiPath";
import axiosInstance from "../../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../../utils/uploadImage";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    if (!fullName) {
      setError("Please Enter Your Name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter a Valid Email.");
      return;
    }
    if (!password) {
      setError("Please Enter the Password.");
      return;
    }
    if (!confPass) {
      setError("Please Enter Confirm Password.");
      return;
    }
    if (password != confPass) {
      setError(`Password Doesn't Matched`);
      return;
    }
    setError("");
    // SignUp API
    try {
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });
      const { token, user } = response.data;
      if(token){
        localStorage.getItem("token", token);
        updateUser(user);
        navigate("/dashbaord");
      }
    } catch (error) {
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
        <div className="flex justify-center flex-col items-center my-8">
          <div className="px-[20px] py-[35px] rounded-2xl shadow-2xl shadow-violet-500 md:w-[100%]">
            <h1 className="text-2xl">Create Account</h1>
            <p className="text-sm mb-7">
              Join us and stop your wallet from leaking!
            </p>
            <form onSubmit={handleSignup}>
              <ProfileImageSelector
                image={profilePic}
                setImage={setProfilePic}
              ></ProfileImageSelector>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <Input
                  value={fullName}
                  label="Full Name"
                  placeholder="Jhon Doe"
                  onChange={({ target }) => {
                    setFullName(target.value);
                  }}
                  type="text"
                />
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
                  placeholder="Enter Your Password"
                  onChange={({ target }) => {
                    setPassword(target.value);
                  }}
                  type="password"
                />
                <Input
                  value={confPass}
                  label="Confirm Password"
                  placeholder="Confirm Your Password"
                  onChange={({ target }) => {
                    setConfPass(target.value);
                  }}
                  type="password"
                />
              </div>
              {error && <p className="text-red-500 text-sm pb-.5 ">{error}</p>}
              <button type="submit" className="btn-primary">
                SIGN UP
              </button>
              <p className="text-[15px] text-slate-800 mt-3">
                Already have an account?{" "}
                <Link
                  className="font-medium text-primary underline"
                  to="/login"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
