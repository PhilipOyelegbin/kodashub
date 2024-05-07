"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaAlignJustify } from 'react-icons/fa'

export default function Navbar() {
    const path = usePathname()

    const menu = [
        {label: "Home", url: "/"},
        {label: "About", url: "/about"},
        {label: "Courses", url: "/courses"},
        {label: "Contact", url: "/contact"},
    ]

  return (
    <nav className='flex items-center justify-between py-2 px-5 lg:px-20 shadow-md'>
        <Image src="/logo.jpg" width={60} height={60} alt="logo"/>

        <FaAlignJustify className='md:hidden'/>

        <ul className='flex flex-col md:flex-row items-center gap-3'>
            {menu.map(item => (
                <Link key={item.url} href={item.url} className={`flex gap-3 items-center py-2 px-3 text-[18px] text-slate-500 cursor-pointer hover:bg-purple-700 hover:text-slate-200 ease-in-out duration-300 rounded-md ${path === item.url && "bg-purple-700 text-slate-100"}`}>
                    {item.label}
                </Link>
            ))}
        </ul>
    </nav>
  )
}
