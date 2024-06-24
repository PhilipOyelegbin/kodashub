import Image from 'next/image'
import {FaBookOpen, FaGraduationCap, FaIdBadge} from 'react-icons/fa'

export default function Sidebar() {
    const menu = [
        {id: 1, name: "All courses", icon: <FaBookOpen/>},
        {id: 2, name: "Membership", icon: <FaIdBadge/>},
        {id: 3, name: "Be Instructor", icon: <FaGraduationCap/>},
    ]

  return (
    <aside className='p-5 h-svh bg-white'>
        <Image src="/next.svg" width={150} height={100} alt="logo"/>

        <hr className='mt-5'/>

        <div className='mt-5'>
            {menu.map(item => (
                <div key={item.id} className='flex gap-3 items-center mt-2 p-3 text-[18px] text-slate-500 cursor-pointer hover:bg-purple-700 hover:text-slate-200 ease-in-out duration-300 rounded-md'>
                    {item.icon}
                    <h4>{item.name}</h4>
                </div>
            ))}
        </div>
    </aside>
  )
}
