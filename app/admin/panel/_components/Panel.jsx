"use client";
import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import {
  FaGlobe,
  FaInternetExplorer,
  FaMoneyBillWave,
  FaServer,
  FaUserCircle,
} from "react-icons/fa";

function Panel() {
  const [users, setUsers] = useState();
  const [hostings, setHostings] = useState();
  const [websites, setWebsites] = useState();
  const [invoices, setInvoices] = useState();

  useLayoutEffect(() => {
    fetch("/api/users")
      .then((resp) => resp.json())
      .then((result) => setUsers(result.data.length))
      .catch((err) => console.log(err));
    fetch("/api/hosting")
      .then((resp) => resp.json())
      .then((result) => setHostings(result.data.length))
      .catch((err) => console.log(err));
    fetch("/api/development")
      .then((resp) => resp.json())
      .then((result) => setWebsites(result.data.length))
      .catch((err) => console.log(err));
    fetch("/api/invoices")
      .then((resp) => resp.json())
      .then((result) => setInvoices(result.data.length))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className='p-5 bg-white rounded shadow-md'>
      <h2 className='text-3xl font-bold text-purple-600 mb-4'>Admin Panel</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <div className='bg-purple-100 p-4 rounded shadow-md flex items-center gap-5 justify-center'>
          <div>
            <h3 className='text-lg font-bold text-purple-600 mb-2'>Users</h3>
            <p className='text-3xl font-bold text-gray-700'>{users}</p>
            <Link
              href='/admin/panel/users'
              className='text-sm text-purple-600 hover:text-purple-700'>
              View All Users
            </Link>
          </div>
          <FaUserCircle className='w-20 h-20' />
        </div>

        <div className='bg-blue-100 p-4 rounded shadow-md flex items-center gap-5 justify-center'>
          <div>
            <h3 className='text-lg font-bold text-blue-600 mb-2'>Hostings</h3>
            <p className='text-3xl font-bold text-gray-700'>{hostings}</p>
            <Link
              href='/admin/panel/hostings'
              className='text-sm text-blue-600 hover:text-blue-700'>
              View All Hostings
            </Link>
          </div>
          <FaServer className='w-20 h-20' />
        </div>

        {/* <div className='bg-green-100 p-4 rounded shadow-md flex items-center gap-5 justify-center'>
          <div>
            <h3 className='text-lg font-bold text-green-600 mb-2'>Domains</h3>
            <p className='text-3xl font-bold text-gray-700'>{domains}</p>
            <Link
              href='/admin/panel/domains'
              className='text-sm text-green-600 hover:text-green-700'>
              View All Domains
            </Link>
          </div>
          <FaGlobe className='w-20 h-20' />
        </div> */}

        <div className='bg-orange-100 p-4 rounded shadow-md flex items-center gap-5 justify-center'>
          <div>
            <h3 className='text-lg font-bold text-orange-600 mb-2'>Websites</h3>
            <p className='text-3xl font-bold text-gray-700'>{websites}</p>
            <Link
              href='/admin/panel/websites'
              className='text-sm text-orange-600 hover:text-orange-700'>
              View All Website
            </Link>
          </div>
          <FaInternetExplorer className='w-20 h-20' />
        </div>

        <div className='bg-yellow-100 p-4 rounded shadow-md flex items-center gap-5 justify-center'>
          <div>
            <h3 className='text-lg font-bold text-orange-600 mb-2'>Invoices</h3>
            <p className='text-3xl font-bold text-gray-700'>{invoices}</p>
            <Link
              href='/admin/panel/invoices'
              className='text-sm text-orange-600 hover:text-orange-700'>
              View All Invoices
            </Link>
          </div>
          <FaMoneyBillWave className='w-20 h-20' />
        </div>
      </div>
    </section>
  );
}

export default Panel;
