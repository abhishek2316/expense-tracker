import React from "react";
import image from "../../src/assets/images/auth-image.jpg";
import {LuTrendingUpDown} from 'react-icons/lu'

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="md:w-[60vw]  w-screen h-screen pb-12 px-8 py-8 overflow-hidden">
        <h1 className="text-3xl">Expense Tracker</h1>
        {children}
      </div>
      <div className="md:w-[40vw] w-screen h-screen pb-12 px-8 hidden md:block overflow-hidden relative bg-gray-100">
        <div className="w-48 h-48 bg-purple-700 rounded-[40px] absolute -top-8 -left-5"></div>
        <div className="w-48 h-48 bg-violet-500 rounded-[40px] absolute -bottom-8 -left-5"></div>
        <div className="w-48 h-56 border-purple-400 border-[20px] rounded-[40px] absolute top-[30%] -right-10"></div>
        <img
          src={image}
          className="bottom-[10%] h-[45%] absolute left-12 w-[80%] rounded-2xl"
        />
        <div className="bg-white my-5 w-[100%] px-8 py-3 rounded-2xl relative flex gap-5">
          <div className=" p-3 rounded-[50%] bg-blue-600 flex justify-center text-white items-center text-3xl">
            {<LuTrendingUpDown/>}
          </div>
          <div>
            <p className="text-xs">Track Your Income & Expense</p>
            <p className="text-2xl">$6000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
