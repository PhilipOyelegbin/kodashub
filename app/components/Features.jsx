function Features() {
  return (
    <section className='flex flex-col justify-center items-center bg-gray-100py-10 px-5 lg:px-20 my-5'>
      <h3 className='text-3xl font-bold text-purple-600 mb-4'>
        Why Host with Us?
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <div className='bg-purple-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-purple-600 mb-2'>
            Fast and Reliable
          </h3>
          <p className='text-gray-700'>
            Our servers are optimized for speed and reliability, ensuring your
            website loads quickly and stays online.
          </p>
          <img
            src='https://example.com/fast-and-reliable-icon.png'
            alt='Fast and Reliable'
          />
        </div>
        <div className='bg-blue-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-blue-600 mb-2'>
            Secure and Protected
          </h3>
          <p className='text-gray-700'>
            We take security seriously, with regular backups, firewalls, and
            malware scanning to keep your website safe.
          </p>
          <img
            src='https://example.com/secure-and-protected-icon.png'
            alt='Secure and Protected'
          />
        </div>
        <div className='bg-green-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-green-600 mb-2'>
            Scalable and Flexible
          </h3>
          <p className='text-gray-700'>
            Our hosting plans are designed to grow with your website, with easy
            upgrades and flexible pricing options.
          </p>
          <img
            src='https://example.com/scalable-and-flexible-icon.png'
            alt='Scalable and Flexible'
          />
        </div>
        <div className='bg-orange-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-orange-600 mb-2'>
            Expert Support
          </h3>
          <p className='text-gray-700'>
            Our team of experts is available 24/7 to help with any questions or
            issues you may have.
          </p>
          <img
            src='https://example.com/expert-support-icon.png'
            alt='Expert Support'
          />
        </div>
        <div className='bg-yellow-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-yellow-600 mb-2'>
            Easy to Use
          </h3>
          <p className='text-gray-700'>
            Our control panel is user-friendly and easy to navigate, making it
            simple to manage your website.
          </p>
          <img
            src='https://example.com/easy-to-use-icon.png'
            alt='Easy to Use'
          />
        </div>
        <div className='bg-red-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-red-600 mb-2'>
            Affordable Pricing
          </h3>
          <p className='text-gray-700'>
            We offer competitive pricing plans to fit any budget, with discounts
            for long-term commitments.
          </p>
          <img
            src='https://example.com/affordable-pricing-icon.png'
            alt='Affordable Pricing'
          />
        </div>
      </div>
    </section>
  );
}

export default Features;
