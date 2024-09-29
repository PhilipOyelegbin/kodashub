import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   const footerMenu = [
//     { label: "Home", link: "/" },
//     // { label: "About", link: "/about" },
//     { label: "Services", link: "/services" },
//     { label: "Contact", link: "/contact" },
//   ];

//   return (
//     <footer className='bg-slate-700 text-slate-200 text-center p-5 lg:px-20'>
//       <div className='flex flex-col sm:flex-row items-center justify-between gap-5 border-b-2 border-slate-300 pb-3'>
//         <Image
//           src='/logo.png'
//           className='w-36 h-auto'
//           width={100}
//           height={100}
//           alt='footer logo'
//         />
//         <div>
//           <h3>Quick Links</h3>
//           <ul className='flex flex-col items-center'>
//             {footerMenu.map((menu, i) => (
//               <Link href={menu.link} key={i} className='hover:text-slate-400'>
//                 {menu.label}
//               </Link>
//             ))}
//           </ul>
//         </div>
//         <div className='flex gap-5 items-center text-2xl'>
//           <Link
//             href='/'
//             target='_blank'
//             className='hover:text-purple-700'
//             rel='noopener noreferrer'
//           >
//             <FaLinkedin />
//           </Link>
//           <Link
//             href='/'
//             target='_blank'
//             className='hover:text-purple-700'
//             rel='noopener noreferrer'
//           >
//             <FaFacebook />
//           </Link>
//           <Link
//             href='/'
//             target='_blank'
//             className='hover:text-purple-700'
//             rel='noopener noreferrer'
//           >
//             <FaTwitter />
//           </Link>
//         </div>
//       </div>
//       <p className='mt-3'>&copy; {year} :: All rights reserverd</p>
//     </footer>
//   );
// }

export default function Footer() {
  const year = new Date().getFullYear();
  const footerMenu = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <footer className='bg-gray-200 p-5 lg:px-20'>
      <div className='flex flex-wrap justify-between'>
        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0'>
          <Image
            src='/logo.png'
            width={100}
            height={100}
            alt='Logo'
            className='w-32 h-32 object-fill mb-4'
          />
          <p className='text-gray-700'>
            Reliable web hosting provider for business scallability...
          </p>
        </div>

        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0'>
          <h4 className='font-bold text-purple-600 mb-2'>Quick Links</h4>
          <ul className='space-y-2'>
            {footerMenu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className='text-lg text-gray-700 hover:text-purple-600'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0'>
          <h4 className='font-bold text-purple-600 mb-2'>Social Media</h4>
          <ul className='space-y-2'>
            <li>
              <Link
                href='#'
                className='flex gap-1 items-center text-lg text-gray-700 hover:text-purple-600'>
                <FaFacebook /> Facebook
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex gap-1 items-center text-lg text-gray-700 hover:text-purple-600'>
                <FaTwitter /> Twitter
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex gap-1 items-center text-lg text-gray-700 hover:text-purple-600'>
                <FaInstagram /> Instagram
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex gap-1 items-center text-lg text-gray-700 hover:text-purple-600'>
                <FaLinkedin /> LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className='my-3 text-gray-700 text-center'>
        &copy; {year} :: All rights reserverd
      </p>
    </footer>
  );
}
