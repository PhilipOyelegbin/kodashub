import Image from "next/image";

function Services() {
  return (
    <section className='py-10 px-5 lg:px-20'>
      <h3 className='text-center'>Cost Effective Services We Offer</h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 justify-center mt-4 gap-5'>
        <div className='flex flex-col md:flex-row gap-2 rounded-xl border border-purple-500 p-5'>
          <Image
            src='/web.jpg'
            className='w-[300px] h-auto'
            width={100}
            height={100}
            alt='banner'
          />
          <div className='flex-1'>
            <h4>Web Development</h4>
            <p>
              Our web hosting is great for static websites, database-driven
              content management systems, and custom applications
            </p>
            <ul className='list-inside list-disc border-t-2 border-slate-300 mt-3 pt-3'>
              <li>Domain Name</li>
              <li>Hosting Service</li>
              <li>Design and Development</li>
              <li>Free SSL</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-2 rounded-xl border border-purple-500 p-5'>
          <Image
            src='/servers.jpg'
            className='w-[300px] h-auto'
            width={100}
            height={100}
            alt='banner'
          />
          <div className='flex-1'>
            <h4>Hosting Server</h4>
            <p>
              Our web hosting is great for static websites, database-driven
              content management systems, and custom applications
            </p>
            <ul className='list-inside list-disc border-t-2 border-slate-300 mt-3 pt-3'>
              <li>cPanel Web Hosting</li>
              <li>Free SSL</li>
              <li>Server Support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
