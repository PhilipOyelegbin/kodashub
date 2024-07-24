import Image from "next/image";
import { FaCube } from "react-icons/fa";

function Services() {
  return (
    <section className='py-10 px-5 lg:px-20'>
      <h3 className='text-center'>Cost Effective Services We Offer</h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 justify-center mt-4 gap-5'>
        <div className='flex flex-col md:flex-row gap-2 rounded-xl border border-purple-500 p-5'>
          <Image src='/web.jpg' width={300} height={100} alt='banner' />
          <div className='flex-1'>
            <h4>Innovative Web Solutions for Emerging Business</h4>
            <ul className='list-inside list-disc border-t-2 border-slate-300 mt-3 pt-3'>
              <li>Domain Name</li>
              <li>Hosting Service</li>
              <li>Design and Development</li>
              <li>SSL</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-2 rounded-xl border border-purple-500 p-5'>
          <Image src='/servers.jpg' width={300} height={100} alt='banner' />
          <div className='flex-1'>
            <h4>
              Cloud Infrastruture and Management Tailored to Company Needs
            </h4>
            <ul className='list-inside list-disc border-t-2 border-slate-300 mt-3 pt-3'>
              <li>Cloud Infrastructure</li>
              <li>Server Configuration</li>
              <li>Server Security</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
