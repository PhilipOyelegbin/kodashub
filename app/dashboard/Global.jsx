"use client";
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const Global = ({ children }) => {
  const path = useRouter();
  const { data: session } = useSession();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (session?.status !== ("authenticated" || "Authenticated")) {
      path.replace("/auth/login");
    } else {
      sessionStorage?.setItem("user", session?.user?.email);
    }
  }, [session]);

  return (
    <article className='relative flex gap-1 items-start'>
      <Sidebar toggle={toggle} handleToggle={handleToggle} />
      <div className='w-full h-screen overflow-x-scroll scroll-m-0'>
        <Header handleToggle={handleToggle} />
        {children}
      </div>
    </article>
  );
};
