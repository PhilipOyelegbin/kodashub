"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { FaEdit, FaPlusSquare, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminHostingPage() {
  const navigate = useRouter();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const handleDeleteHosting = async (id) => {
    try {
      const deleteHosting = await fetch(`/api/hosting/${id}`, {
        method: "DELETE",
      });
      if (deleteHosting.ok) {
        toast.success("Deleted Successfully");
        navigate.refresh();
      } else {
        toast.error(deleteHosting?.statusText);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    fetch(`/api/hosting`)
      .then((resp) => resp.json())
      .then((result) => setData(result?.data))
      .catch((err) => setError(err));
  }, []);

  return (
    <section className='p-3 bg-white rounded shadow-md'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-purple-600 mb-4'>Hostings</h2>
        <Link href='/admin/panel/hostings/new'>
          <FaPlusSquare className='text-blue-500 hover:text-blue-700 text-2xl' />
        </Link>
      </div>

      {error && (
        <h5 className='text-center text-red-600 mb-4'>
          Error: {error.message}
        </h5>
      )}

      <ul className='relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {data?.map((item) => (
          <li className='rounded-md bg-purple-100' key={item.id}>
            <div className='flex text-center justify-center p-4'>
              <div className='space-y-2'>
                <span
                  className={`text-xs font-bold ${
                    item.status ? "text-lime-500" : "text-red-500"
                  }`}>
                  {item.status ? "Active" : "Inactive"}
                </span>
                <h4 className='text-gray-800 font-semibold'>{item.name}</h4>
                <p className='text-gray-600 text-sm'>₦{item.price}</p>
              </div>
            </div>
            <div className='flex gap-2 text-2xl py-2 px-4 border-t-2 text-right'>
              <Link href={`/admin/panel/hostings/${item.id}`}>
                <FaEdit className='text-purple-500 hover:text-purple-700' />
              </Link>
              <FaTrash
                className='text-red-500 hover:text-red-700 cursor-pointer'
                onClick={() => handleDeleteHosting(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>

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

export default AdminHostingPage;
