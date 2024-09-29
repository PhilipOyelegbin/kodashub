import Link from "next/link";

function Panel() {
  const users = 100;
  const hostings = 50;
  const domains = 200;
  const developmentServices = 30;
  const invoices = 70;

  return (
    <section className='p-5 bg-white rounded shadow-md'>
      <h2 className='text-3xl font-bold text-purple-600 mb-4'>Admin Panel</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <div className='bg-purple-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-purple-600 mb-2'>Users</h3>
          <p className='text-3xl font-bold text-gray-700'>{users}</p>
          <Link
            href='/admin/users'
            className='text-sm text-purple-600 hover:text-purple-700'>
            View All Users
          </Link>
        </div>
        <div className='bg-blue-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-blue-600 mb-2'>Hostings</h3>
          <p className='text-3xl font-bold text-gray-700'>{hostings}</p>
          <Link
            href='/admin/hostings'
            className='text-sm text-blue-600 hover:text-blue-700'>
            View All Hostings
          </Link>
        </div>
        <div className='bg-green-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-green-600 mb-2'>Domains</h3>
          <p className='text-3xl font-bold text-gray-700'>{domains}</p>
          <Link
            href='/admin/domains'
            className='text-sm text-green-600 hover:text-green-700'>
            View All Domains
          </Link>
        </div>
        <div className='bg-orange-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-orange-600 mb-2'>
            Development Services
          </h3>
          <p className='text-3xl font-bold text-gray-700'>
            {developmentServices}
          </p>
          <Link
            href='/admin/websites'
            className='text-sm text-orange-600 hover:text-orange-700'>
            View All Development Services
          </Link>
        </div>
        <div className='bg-orange-100 p-4 rounded shadow-md'>
          <h3 className='text-lg font-bold text-orange-600 mb-2'>Invoices</h3>
          <p className='text-3xl font-bold text-gray-700'>{invoices}</p>
          <Link
            href='/admin/invoice'
            className='text-sm text-orange-600 hover:text-orange-700'>
            View All Invoices
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Panel;
