import Services from "./_components/Services";
import HostPricing from "./_components/HostPricing";
import WebPricing from "./_components/WebPricing";
import { FAQ } from "./_components/FAQ";

function Service() {
  return (
    <article>
      <div className='w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700'>
        <h1>Services</h1>
      </div>
      <Services />
      <WebPricing />
      <HostPricing />
      <FAQ />
    </article>
  );
}

export default Service;
