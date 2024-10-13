"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFileInvoice } from "react-icons/fa";
import {
  FiBriefcase,
  FiChrome,
  FiLogOut,
  FiMonitor,
  FiServer,
  FiUser,
} from "react-icons/fi";

export const Sidebar = ({ toggle, handleToggle }) => {
  const route = useRouter();
  const navigation = [
    { url: "/dashboard", title: "Dashboard", icon: <FiMonitor /> },
    {
      url: "/dashboard/offerings",
      title: "New Services",
      icon: <FiBriefcase />,
    },
    { url: "/dashboard/hosting", title: "My Hosting", icon: <FiServer /> },
    { url: "/dashboard/website", title: "My Website", icon: <FiChrome /> },
    { url: "/dashboard/billing", title: "My Invoice", icon: <FaFileInvoice /> },
    { url: "/dashboard/profile", title: "Profile", icon: <FiUser /> },
  ];

  const handleSignOut = async () => {
    localStorage?.clear();
    route.replace("/auth/login");
  };

  return (
    <aside
      className={`${
        toggle ? "left-0 absolute md:static" : "-left-full fixed"
      } w-24 h-screen duration-300 ease-linear bg-white z-30`}>
      <div className='flex flex-col h-full p-5 space-y-5 relative'>
        <div className='text-center'>
          <Image
            src='/logo.png'
            width={300}
            height={300}
            className='object-fill w-40 aspect-square'
            alt='KodasHub logo'
          />
          <h5 className='text-wrap w-full'>
            {localStorage?.getItem("user")?.split("@")[0]}...
          </h5>
        </div>

        <div className='flex-1 flex flex-col h-full'>
          <ul className='px-4 font-medium flex-1'>
            {navigation.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.url}
                  onClick={handleToggle}
                  className='relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group'>
                  <div className='text-gray-500 text-2xl'>{item.icon}</div>
                  <span className='absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150'>
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className='px-4 pb-4 text-sm font-medium'>
            <li
              onClick={handleSignOut}
              className='relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group cursor-pointer'>
              <div className='text-gray-500 text-2xl'>
                <FiLogOut />
              </div>
              <span className='absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150'>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
