import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({ value, placeholder, onChange, label, type }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[15px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="w-full bg-transparent outline-none"
        />
        {type == "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={()=>togglePasword()}
              ></FaRegEye>
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-primary cursor-pointer"
                onClick={()=>togglePasword()}
              ></FaRegEyeSlash>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Input;
