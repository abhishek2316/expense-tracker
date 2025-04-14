import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfileImageSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPrevUrl(preview);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPrevUrl(null);
  };

  const chooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImage}
        className="hidden"
      />
      {!image ? (
        <div className="h-20 w-20 bg-purple-200 rounded-full flex justify-center relative items-center">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="absolute justify-center items-center flex h-7 w-7 rounded-full bg-purple-600 text-white bottom-0 right-0"
            onClick={chooseFile}
          >
            <LuUpload></LuUpload>
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={prevUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 absolute bg-red-500 rounded-full justify-center flex items-center text-white -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash></LuTrash>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileImageSelector;
