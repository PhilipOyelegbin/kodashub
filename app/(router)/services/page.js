import Features from "./_components/Features";
import Services from "./_components/Services";
import CloudPricing from "./_components/CloudPricing";
import WebPricing from "./_components/WebPricing";

function page() {
  return (
    <article>
      <div className='w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700'>
        <h1>Services</h1>
      </div>
      <Services />
      <Features />
      <WebPricing />
      <CloudPricing />
    </article>
  );
}

export default page;
