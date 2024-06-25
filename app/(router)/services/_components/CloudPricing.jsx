import { FaCube } from "react-icons/fa";

function CloudPricing() {
  return (
    <section className='py-10 px-5 lg:px-20'>
      <h3 className='text-center'>
        Choose Your Ideal Pricing Plan for Effective Cloud Service
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mt-4 gap-5'>
        <div className='flex flex-col gap-2 rounded-md border border-purple-500 p-5'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Bronze Plan</h4>
            <h4 className='py-3'>₦900,000</h4>
            <p>
              Perfect for small businesses or those getting started with cloud
              management
            </p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>1 - 2 Provisioning of Linux or Window Server</li>
            <li>1 - 2 Server Configuration</li>
            <li>Domain and Server Configurartion</li>
            <li>Server Security</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-md border border-purple-500 p-5'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Silver Plan</h4>
            <h4 className='py-3'>₦1,600,000</h4>
            <p>
              Designed for growing businesses that require average cloud
              management capabilities.
            </p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>3 - 4 Provisioning of Linux or Window Server</li>
            <li>3 - 4 Server Configuration</li>
            <li>Domain and Server Configurartion</li>
            <li>Server Security</li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 rounded-md border border-purple-500 p-5'>
          <div className='border-b-2 border-slate-300 pb-3'>
            <h4>Gold Plan</h4>
            <h4 className='py-3'>₦2,500,000</h4>
            <p>
              Tailored for large organizations with complex cloud
              infrastructures requirements.
            </p>
          </div>
          <ul className='list-inside list-disc font-light'>
            <li>5 - 10 Provisioning of Linux or Window Server</li>
            <li>5 - 10 Server Configuration</li>
            <li>Domain and Server Configurartion</li>
            <li>Server Security</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CloudPricing;
