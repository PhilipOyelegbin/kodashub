"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";

export const Header = ({ handleToggle }) => {
  const path = usePathname();
  const headerTitle = path.split("/").splice(2);

  return (
    <header className='flex justify-between items-center p-5 shadow-md'>
      <FaAlignJustify
        className='cursor-pointer text-purple-500'
        onClick={handleToggle}
      />
      <h3>
        {headerTitle.length == 0 ? "DASHBOARD" : headerTitle[0]?.toUpperCase()}
      </h3>
      <Image
        src='/male.jpg'
        className='w-10 border-2 border-purple-500 aspect-square rounded-full'
        width={100}
        height={100}
        alt='avatar'
      />
    </header>
  );
};
