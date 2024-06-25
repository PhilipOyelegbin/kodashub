import { FaCube } from "react-icons/fa";

function Features() {
  return (
    <section className='py-10 px-5 lg:px-20 bg-purple-900 text-slate-200'>
      <h3 className='text-center'>
        Powerful Cloud Solutions for Enhanced Scalability
      </h3>
      <p className='text-center mt-2'>
        Discover the key features that make{" "}
        <span className='text-white font-bold'>KodasHub</span> stand out
      </p>
      <div className='flex flex-wrap justify-center mt-4 gap-5'>
        <div className='flex gap-2 max-w-[350px] hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-purple-700 p-4 rounded-tl-3xl rounded-br-3xl text-center'>
          <div>
            <h4>Cost Optimization</h4>
            <p>Engage students with interactive content and activities</p>
          </div>
          <FaCube className='w-16 h-16' />
        </div>
        <div className='flex gap-2 max-w-[350px] hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-slate-200 text-purple-700 p-4 rounded-tl-3xl rounded-br-3xl text-center'>
          <div>
            <h4>Enhanced Security</h4>
            <p>Monitor student progress and performance in real-time</p>
          </div>
          <FaCube className='w-16 h-16' />
        </div>
        <div className='flex gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-purple-700 p-4 rounded-tl-3xl rounded-br-3xl text-center'>
          <div>
            <h4>Streamlined Operations</h4>
            <p>Facilitate collaboration among students and teachers</p>
          </div>
          <FaCube className='w-16 h-16' />
        </div>
        <div className='flex gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-slate-200 text-purple-700 p-4 rounded-tl-3xl rounded-br-3xl'>
          <div>
            <h4>Performance and Reliability</h4>
            <p>Access learning materials on-the-go with mobile support</p>
          </div>
          <FaCube className='w-16 h-16' />
        </div>
        <div className='flex gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-purple-700 p-4 rounded-tl-3xl rounded-br-3xl'>
          <div>
            <h4>Scalability and Flexibility</h4>
            <p>Access learning materials on-the-go with mobile support</p>
          </div>
          <FaCube className='w-16 h-16' />
        </div>
        <div className='flex gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-slate-200 text-purple-700 p-4 rounded-tl-3xl rounded-br-3xl'>
          <div>
            <h4>Monitoring and Support</h4>
            <p>Access learning materials on-the-go with mobile support</p>
          </div>
          <FaCube className='w-16 h-16' />
        </div>
      </div>
    </section>
  );
}

export default Features;
