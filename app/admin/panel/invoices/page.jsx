"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminInvoicePage() {
  const navigate = useRouter();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const handleDeleteInvoice = async (id) => {
    try {
      const deleteInvoice = await fetch(`/api/invoices/${id}`, {
        method: "DELETE",
      });
      if (deleteInvoice.ok) {
        toast.success("Deleted Successfully");
        navigate.refresh();
      } else {
        toast.error(deleteInvoice?.statusText);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    fetch(`/api/invoices`)
      .then((resp) => resp.json())
      .then((result) => setData(result?.data))
      .catch((err) => setError(err));
  }, []);

  return (
    <section className='p-3 bg-white rounded shadow-md'>
      <h2 className='text-3xl font-bold text-purple-600 mb-4'>Invoices</h2>

      {error && (
        <h5 className='text-center text-red-600 mb-4'>
          Error: {error.message}
        </h5>
      )}

      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-left'>Name</th>
            <th className='text-left'>Status</th>
            <th className='text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.status ? "Paid" : "Unpaid"}</td>
              <td className='flex gap-2 text-2xl'>
                <Link href={`/admin/panel/invoices/${user.id}`}>
                  <FaEdit className='text-purple-500 hover:text-purple-700' />
                </Link>
                <FaTrash
                  className='text-red-500 hover:text-red-700 cursor-pointer'
                  onClick={() => handleDeleteInvoice(user.id)}
                />
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
    </section>
  );
}

export default AdminInvoicePage;
