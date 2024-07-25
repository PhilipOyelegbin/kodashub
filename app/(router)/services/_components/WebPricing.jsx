import { FaCube } from "react-icons/fa";

function WebPricing() {
  return (
    <section className='py-10 px-5 bg-purple-500 text-white lg:px-20'>
      <h3 className='text-center'>
        Choose Your Ideal Pricing Plan for Innovative Web Solutions
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mt-4 gap-5'>
        <div className='flex flex-col gap-2 rounded-xl border border-slate-300 p-5 hover:bg-white hover:text-slate-700 duration-300 ease-linear'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Basic Plan</h4>
            <h4 className='py-3'>₦500,000</h4>
            <p>
              Perfect for small scale businesses like blogging and service
              rendering.
            </p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>Domain purchase</li>
            <li>Shared Hosting purchase</li>
            <li>Web design and development</li>
            <li>Free SSL</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-xl border border-slate-300 p-5 hover:bg-white hover:text-slate-700 duration-300 ease-linear'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Pro Plan</h4>
            <h4 className='py-3'>₦1,000,000</h4>
            <p>Designed for medium scale businesses like Ecommerce.</p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>Domain purchase</li>
            <li>Shared Hosting purchase</li>
            <li>Web design and development</li>
            <li>Paid SSL</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-xl border border-slate-300 p-5 hover:bg-white hover:text-slate-700 duration-300 ease-linear'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Executive Plan</h4>
            <h4 className='py-3'>₦1,700,000</h4>
            <p>
              Tailored for large scale businesses like B2B services and SaSS
              Projects.
            </p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>Domain purchase</li>
            <li>Shared Hosting purchase</li>
            <li>Web design and development</li>
            <li>Paid SSL</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WebPricing;
