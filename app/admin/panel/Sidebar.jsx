"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBackward, FaTimes } from "react-icons/fa";

export const Sidebar = ({ toggle, handleToggle }) => {
  const path = usePathname();
  const sideLinks = [
    { url: "/admin/panel", title: "Panel" },
    { url: "/admin/panel/services", title: "Services" },
    { url: "/admin/panel/users", title: "Users" },
    { url: "/admin/panel/hostings", title: "Hostings" },
    { url: "/admin/panel/websites", title: "Websites" },
    { url: "/admin/panel/invoices", title: "Invoices" },
  ];

  const handleSignOut = async () => {
    localStorage.clear();
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <aside
      className={`${
        toggle ? "left-0 absolute md:static" : "-left-full fixed"
      } p-5 h-screen shadow-md duration-300 ease-linear bg-white z-30`}>
      <div className='text-center mb-5'>
        <div className='w-full flex justify-end mb-5 text-2xl right-5 md:hidden'>
          <FaTimes
            className='cursor-pointer text-purple-500'
            onClick={handleToggle}
          />
        </div>
        <Image
          src='/male.jpg'
          className='w-20 border-2 border-purple-500 aspect-square rounded-full'
          width={100}
          height={100}
          alt='profile image'
        />
        <h5 className='text-wrap w-full'>Administrator</h5>
      </div>

      <hr />

      <ul className='flex flex-col gap-5 mt-5'>
        {sideLinks.map((list, i) => (
          <Link
            key={i}
            href={list.url}
            onClick={handleToggle}
            className={
              path === list.url
                ? "text-purple-500"
                : "text-slate-700 duration-300 ease-linear hover:text-purple-400"
            }>
            {list.title}
          </Link>
        ))}
        <p
          className='flex items-center gap-1 border-b border-red-500 w-fit cursor-pointer text-red-500 hover:text-red-300 hover:border-red-300 duration-300 ease-linear'
          onClick={handleSignOut}>
          <FaBackward />
          Logout
        </p>
      </ul>
    </aside>
  );
};