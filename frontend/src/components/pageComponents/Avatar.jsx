import React from "react";

const Avatar = () => {
  return (
    <div className="avatar rounded-full  cursor-pointer">
      <div className="w-9 sm:w-12 rounded-full hover:border-2">
        <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
      </div>
    </div>
  );
};

export default Avatar;
