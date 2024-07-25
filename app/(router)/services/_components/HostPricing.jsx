import { FaCube } from "react-icons/fa";

function HostPricing() {
  return (
    <section className='py-10 px-5 lg:px-20'>
      <h3 className='text-center'>
        Choose Your Ideal Pricing Plan for Effective Host Server
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center mt-4 gap-5'>
        <div className='flex flex-col gap-2 rounded-xl border border-purple-500 p-5 hover:bg-purple-500 hover:text-slate-200 duration-300 ease-linear'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Plastic Plan</h4>
            <h4 className='py-3'>₦1,000/month</h4>
            <p>Perfect for portfolio or landing page website</p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>1/1 domain and subdomain</li>
            <li>5 Gb Storage</li>
            <li>30 Gb Bandwith</li>
            <li>Free SSL</li>
            <li>5 email accounts</li>
            <li>1GB email quota</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-xl border border-purple-500 p-5 hover:bg-purple-500 hover:text-slate-200 duration-300 ease-linear'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Bronze Plan</h4>
            <h4 className='py-3'>₦5,000/month</h4>
            <p>Designated for small and medium scale business</p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>2/2 domain and subdomain</li>
            <li>10 Gb Storage</li>
            <li>30 Gb Bandwith</li>
            <li>Free SSL</li>
            <li>12 email accounts</li>
            <li>4GB email quota</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-xl border border-purple-500 p-5 hover:bg-purple-500 hover:text-slate-200 duration-300 ease-linear'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Silver Plan</h4>
            <h4 className='py-3'>₦10,000/month</h4>
            <p>Designed for fast growing organizations</p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>4/4 domain and subdomain</li>
            <li>18 Gb Storage</li>
            <li>50 Gb Bandwith</li>
            <li>Free SSL</li>
            <li>20 email accounts</li>
            <li>10GB email quota</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-xl border border-purple-500 p-5 hover:bg-purple-500 hover:text-slate-200 duration-300 ease-linear'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Gold Plan</h4>
            <h4 className='py-3'>₦20,000/month</h4>
            <p>Tailored for large businesslike Ecommerce store.</p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>7/7 domain and subdomain</li>
            <li>30 Gb Storage</li>
            <li>100 Gb Bandwith</li>
            <li>Free SSL</li>
            <li>unlimited email accounts</li>
            <li>unlimited email quota</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HostPricing;
