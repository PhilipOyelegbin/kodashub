"use client";
import { useState, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MyInvoices = () => {
  const [data, setData] = useState();

  useLayoutEffect(() => {
    fetch(`/api/invoices/${sessionStorage.getItem("user")}`)
      .then((resp) => resp.json())
      .then((result) => setData(result.data))
      .catch((error) => toast.error(error));
  }, [sessionStorage.getItem("user")]);

  return (
    <div className='text-center py-10'>
      <h3>My Invoices</h3>
      <table className='text-left min-w-full divide-y divide-gray-200 my-5'>
        <thead className='bg-purple-200'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              ID
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Item
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Price
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Status
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Date
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data?.map((invoice) => (
            <tr key={invoice.id}>
              <td className='px-6 py-4 whitespace-nowrap'>
                {invoice.id.split("-")[0]}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>{invoice.name}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{invoice.price}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {invoice.status == false ? "Unpaid" : "Paid"}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {invoice.createdAt.split("T")[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
};
