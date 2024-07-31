"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const Global = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='relative flex gap-1 items-start'>
      <Sidebar toggle={toggle} handleToggle={handleToggle} />
      <div className='w-full h-screen overflow-x-scroll scroll-m-0'>
        <Header handleToggle={handleToggle} />
        <main className='p-5'>{children}</main>
      </div>
    </div>
  );
};
