"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const dynamic = "force-dynamic";

export default function PanelLayout({ children }) {
  // const path = useRouter();
  // const { data: session } = useSession();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // useEffect(() => {
  //   if (session?.status !== ("authenticated" || "Authenticated")) {
  //     path.replace("/admin");
  //   } else {
  //     sessionStorage?.setItem("user", session?.user?.email);
  //   }
  // }, [session]);

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
