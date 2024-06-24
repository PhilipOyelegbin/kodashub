import { FaCube } from "react-icons/fa";

function Pricing() {
  return (
    <section className='py-10 px-5 lg:px-20'>
      <h3 className='text-center'>
        Choose Your Ideal Pricing Plan for Effective Cloud Management
      </h3>
      {/* <p className='text-center mt-2'>
        Discover the key features that make{" "}
        <span className='text-white font-bold'>KodasHub</span> stand out
      </p> */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center mt-4 gap-5'>
        <div className='flex flex-col gap-2 rounded-md border border-purple-500 p-5'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Basic Plan</h4>
            <h4 className='py-3'>₦250,000</h4>
            <p>
              Perfect for small businesses or those getting started with cloud
              management
            </p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>Ultricies ut nibh purus</li>
            <li>Malesuada fe ui nibh purus</li>
            <li>Ultricies ut nibh purus</li>
            <li>Malesuada fe ui nibh purus</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-md border border-purple-500 p-5'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Pro Plan</h4>
            <h4 className='py-3'>₦500,000</h4>
            <p>
              Designed for growing businesses that require average cloud
              management capabilities.
            </p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>Ultricies ut nibh purus</li>
            <li>Malesuada fe ui nibh purus</li>
            <li>Ultricies ut nibh purus</li>
            <li>Malesuada fe ui nibh purus</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-md border border-purple-500 p-5'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Deluxe Plan</h4>
            <h4 className='py-3'>₦900,000</h4>
            <p>
              Designed for established businesses that require advanced cloud
              management capabilities.
            </p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>Ultricies ut nibh purus</li>
            <li>Malesuada fe ui nibh purus</li>
            <li>Ultricies ut nibh purus</li>
            <li>Malesuada fe ui nibh purus</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-md border border-purple-500 p-5'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Executive Plan</h4>
            <h4 className='py-3'>₦1,500,000</h4>
            <p>
              Tailored for large organizations with complex cloud
              infrastructures requirements.
            </p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>Ultricies ut nibh purus</li>
            <li>Malesuada fe ui nibh purus</li>
            <li>Ultricies ut nibh purus</li>
            <li>Malesuada fe ui nibh purus</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
