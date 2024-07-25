"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBackward } from "react-icons/fa";

export const Sidebar = ({ toggle }) => {
  const path = usePathname();
  const sideLinks = [
    { url: "/user", title: "Dashboard" },
    { url: "/hosting", title: "Hosting" },
    { url: "/domain", title: "Domain" },
    { url: "/billing", title: "Billing" },
  ];

  return (
    <aside
      className={`${
        toggle ? "left-0 static" : "-left-full fixed"
      } p-5 h-screen shadow-md duration-300 ease-linear`}
    >
      <div className='text-center mb-5'>
        <Image
          src='/male.jpg'
          className='w-20 border-2 border-purple-500 aspect-square rounded-full'
          width={100}
          height={100}
          alt='profile image'
        />
        <h5>Full name</h5>
      </div>

      <hr />

      <ul className='flex flex-col gap-5 mt-5'>
        {sideLinks.map((list, i) => (
          <Link
            key={i}
            href={list.url}
            className={
              path === list.url
                ? "text-purple-500"
                : "text-slate-700 duration-300 ease-linear hover:text-purple-400"
            }
          >
            {list.title}
          </Link>
        ))}
        <p className='flex items-center gap-1 border-b border-red-500 w-fit cursor-pointer text-red-500 hover:text-red-300 hover:border-red-300 duration-300 ease-linear'>
          <FaBackward />
          Logout
        </p>
      </ul>
    </aside>
  );
};
