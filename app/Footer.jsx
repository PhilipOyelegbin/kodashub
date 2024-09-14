import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerMenu = [
    { label: "Home", link: "/" },
    // { label: "About", link: "/about" },
    { label: "Services", link: "/services" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <footer className='bg-slate-700 text-slate-200 text-center p-5 lg:px-20'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-5 border-b-2 border-slate-300 pb-3'>
        <Image
          src='/logo.png'
          className='w-36 h-auto'
          width={100}
          height={100}
          alt='footer logo'
        />
        <div>
          <h3>Quick Links</h3>
          <ul className='flex flex-col items-center'>
            {footerMenu.map((menu, i) => (
              <Link href={menu.link} key={i} className='hover:text-slate-400'>
                {menu.label}
              </Link>
            ))}
          </ul>
        </div>
        <div className='flex gap-5 items-center text-2xl'>
          <Link
            href='/'
            target='_blank'
            className='hover:text-purple-700'
            rel='noopener noreferrer'
          >
            <FaLinkedin />
          </Link>
          <Link
            href='/'
            target='_blank'
            className='hover:text-purple-700'
            rel='noopener noreferrer'
          >
            <FaFacebook />
          </Link>
          <Link
            href='/'
            target='_blank'
            className='hover:text-purple-700'
            rel='noopener noreferrer'
          >
            <FaTwitter />
          </Link>
        </div>
      </div>
      <p className='mt-3'>&copy; {year} :: All rights reserverd</p>
    </footer>
  );
}
