"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { jwtDecode } from "jwt-decode";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }) {
  const [toggle, setToggle] = useState(false);
  const path = useRouter();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  if (!localStorage?.getItem("token")) {
    path.replace("/auth/login");
  } else {
    const decode = jwtDecode(localStorage?.getItem("token"));
    localStorage?.setItem("user", decode.email);
  }

  return (
    <article className='relative flex gap-1 items-start'>
      <Sidebar toggle={toggle} handleToggle={handleToggle} />
      <div className='w-full h-screen overflow-x-scroll scroll-m-0'>
        <Header handleToggle={handleToggle} />
        <div className='p-5 bg-slate-300'>{children}</div>
      </div>
    </article>
  );
}
