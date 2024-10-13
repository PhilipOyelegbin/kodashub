"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const dynamic = "force-dynamic";

export default function PanelLayout({ children }) {
  const path = useRouter();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (localStorage.getItem("ssp") !== process.env.SSP) {
      path.replace("/admin");
    }
  }, [path]);

  return (
    <article className='relative flex gap-1 items-start'>
      <Sidebar toggle={toggle} handleToggle={handleToggle} />
      <div className='w-full h-screen overflow-x-scroll scroll-m-0'>
        <Header handleToggle={handleToggle} />
        <div className='space-y-5 bg-slate-400 p-3'>{children}</div>
      </div>
    </article>
  );
}
