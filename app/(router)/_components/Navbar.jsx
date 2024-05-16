"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaAlignJustify } from 'react-icons/fa'

export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const path = usePathname()

    const menu = [
        {label: "Home", url: "/"},
        {label: "About", url: "/about"},
        {label: "Courses", url: "/courses"},
        {label: "Contact", url: "/contact"},
    ] 

    // toggleMenu ? document.getElementsByTagName("body").classList.add("fixed") : document.getElementsByTagName("body").classList.remove("fixed")

  return (
    <nav className='flex items-center justify-between py-2 px-5 lg:px-20 shadow-md relative'>
        <Image src="/logo.png" width={80} height={60} alt="logo" />

        <FaAlignJustify className='md:hidden cursor-pointer h-6 w-6 text-purple-700' onClick={() => setToggleMenu(!toggleMenu)}/>

        <ul className={`${toggleMenu ? 'right-0' : '-right-full'} fixed z-20 bg-[#eee] md:bg-transparent md:static top-20 p-5 flex flex-col md:flex-row items-start gap-3 w-full md:items-center md:w-auto ease-in-out duration-300`}>
            {menu.map(item => (
                <Link key={item.url} href={item.url} className={`${path === item.url && "bg-purple-500 text-white"} flex gap-3 items-center py-2 px-3 text-[18px] text-slate-700 cursor-pointer hover:bg-purple-500 hover:text-slate-200 ease-in-out duration-300 rounded-md`} onClick={() => setToggleMenu(!toggleMenu)}>
                    {item.label}
                </Link>
            ))}
            <Link href="/register" onClick={() => setToggleMenu(!toggleMenu)} className='btn'>Register</Link>
        </ul>
    </nav>
  )
}
