"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaAlignJustify, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const path = usePathname();

  const menu = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Services", url: "/services" },
    { label: "Contact", url: "/contact" },
  ];

  return (
    <nav className='flex items-center justify-between py-2 px-5 lg:px-20 shadow-md relative'>
      <Image src='/logo.png' width={80} height={60} alt='logo' />

      <FaAlignJustify
        className='md:hidden cursor-pointer h-6 w-6 text-purple-700'
        onClick={() => setToggleMenu(!toggleMenu)}
      />

      <ul
        className={`${
          toggleMenu ? "right-0" : "-right-full"
        } fixed z-20 bg-[#eee] md:bg-transparent md:static top-0 p-5 flex flex-col md:flex-row items-start gap-3 w-full md:items-center md:w-auto ease-in-out duration-300`}
      >
        {menu.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className={`${
              path === item.url ? "text-purple-500" : "text-slate-700"
            } flex gap-3 items-center py-2 px-3 text-[18px] cursor-pointer hover:text-purple-500 ease-in-out duration-300 rounded-md`}
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            {item.label}
          </Link>
        ))}
        <FaTimes
          className='mx-auto md:hidden cursor-pointer h-6 w-6 text-purple-700'
          onClick={() => setToggleMenu(!toggleMenu)}
        />
      </ul>
    </nav>
  );
}
