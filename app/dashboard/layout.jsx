"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }) {
  const [toggle, setToggle] = useState(false);
  const path = useRouter();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  if (!sessionStorage.getItem("user")) {
    path.replace("/auth/login");
  }

  return (
    <article className='relative flex gap-1 items-start'>
      <Sidebar toggle={toggle} handleToggle={handleToggle} />
      <div className='w-full h-screen overflow-x-scroll scroll-m-0'>
        <Header handleToggle={handleToggle} />
        {children}
      </div>
    </article>
  );
}
