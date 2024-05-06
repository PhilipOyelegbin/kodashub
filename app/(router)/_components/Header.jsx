import { FaBell, FaSearch } from "react-icons/fa";


export default function Header() {
  return (
    <header className='flex justify-between items-center p-5 lg:px-20 bg-white text-slate-900'>
        <div className="flex gap-2 items-center border rounded-md p-2">
            <FaSearch className="h-5 w-5"/>
            <input type='text' placeholder='Search' className='bg-white text-slate-900 outline-none'/>
        </div>
        <div className="flex items-center gap-4">
            <FaBell className="text-slate-500"/>
            <button className="btn">Get Started</button>
        </div>
    </header>
  )
}
