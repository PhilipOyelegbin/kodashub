import { FaChartLine, FaHeadphones, FaLock } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";

function Features() {
  return (
    <section className='py-10 px-5 lg:px-20 bg-purple-900 text-slate-200'>
      <h3 className='text-center'>Why Choose KodasHub?</h3>
      <p className='text-center mt-2'>
        Discover the benefits of our top-tier web hosting and development
        services.
      </p>
      <div className='grid grid-cols-2 md:grid-cols-4 mt-4 gap-5'>
        <div className='flex flex-col gap-2 items-center justify-center'>
          <IoIosSpeedometer className='w-16 h-16 bg-purple-700 p-5 rounded-full' />
          <h4>Blazing Fast Speeds</h4>
        </div>

        <div className='flex flex-col gap-2 items-center justify-center'>
          <FaLock className='w-16 h-16 bg-purple-700 p-5 rounded-full' />
          <h4>Robust Security</h4>
        </div>

        <div className='flex flex-col gap-2 items-center justify-center'>
          <FaChartLine className='w-16 h-16 bg-purple-700 p-5 rounded-full' />
          <h4>Scalable Solutions</h4>
        </div>

        <div className='flex flex-col gap-2 items-center justify-center'>
          <FaHeadphones className='w-16 h-16 bg-purple-700 p-5 rounded-full' />
          <h4>24/7 Customer Support</h4>
        </div>
      </div>
    </section>
  );
}

export default Features;
