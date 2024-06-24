import { FaCube } from "react-icons/fa";
import Features from "./_components/Features";

function page() {
  return (
    <article>
      <div className='w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700'>
        <h1>Services</h1>
      </div>

      <Features />
    </article>
  );
}

export default page;
