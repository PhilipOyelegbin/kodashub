import { useLocation } from "react-router-dom";
import { FaAlignJustify, FaUserCircle } from "react-icons/fa";

export const Header = ({ handleToggle }) => {
  const path = useLocation();
  const headerTitle = path?.pathname.split("/").splice(0, 0);

  return (
    <header className='flex justify-between items-center p-5 shadow-md'>
      <FaAlignJustify
        className='cursor-pointer text-purple-500'
        onClick={handleToggle}
      />
      <h3>
        {headerTitle.length == 0 ? "DASHBOARD" : headerTitle[0]?.toUpperCase()}
      </h3>
      <FaUserCircle className='w-10 h-10 text-purple-500' />
    </header>
  );
};
