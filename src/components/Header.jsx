import React from "react";
import img1 from "../assets/Content.svg";
export default function Header() {
  return (
    <div className=" max-w-[1440px] w-full flex justify-center items-center h-[72px] bg-white  mx-auto sticky top-0 mb-5 border-b z-10 border-[#EAECF0]">
      <div className="size-[32px]">
        <img src={img1} alt="Header Logo" />
      </div>
    </div>
  );
}
