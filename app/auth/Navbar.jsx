"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const route = usePathname();

  return (
    <nav className='flex items-center justify-between py-2 px-5 lg:px-20 shadow-md relative'>
      <Link href='/' target='_parent'>
        <Image
          src='/logo.png'
          className='w-20 h-14'
          width={100}
          height={100}
          alt='logo'
        />
      </Link>
      <Link
        href={
          route === "/auth/login"
            ? "register"
            : route === "/auth/register" && "login"
        }
        className='underline text-xl hover:text-purple-500 ease-linear duration-300'>
        {route === "/auth/login"
          ? "Register"
          : route === "/auth/register" && "Login"}
      </Link>
    </nav>
  );
};
