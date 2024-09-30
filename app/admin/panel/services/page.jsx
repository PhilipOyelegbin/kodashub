"use client";
import Loading from "@/app/loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminServicePage() {
  const navigate = useRouter();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const handleDeleteService = async (id) => {
    try {
      const deleteService = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      if (deleteService.ok) {
        toast.success("Deleted Successfully");
        navigate.refresh();
      } else {
        toast.error(deleteService?.statusText);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    fetch(`/api/services`)
      .then((resp) => resp.json())
      .then((result) => setData(result?.data))
      .catch((err) => setError(err));
  }, []);

  return (
    <section className='p-3 bg-white rounded shadow-md'>
      <h2 className='text-3xl font-bold text-purple-600 mb-4'>Services</h2>

      {!data ? (
        <Loading />
      ) : (
        error && (
          <h5 className='text-center text-red-600 mb-4'>
            Error: {error.message}
          </h5>
        )
      )}

      <ul className='relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {data?.map((service) => (
          <li className='rounded-md bg-purple-100' key={service.id}>
            <div className='flex items-start justify-between p-4'>
              <div className='space-y-2'>
                {service.category}
                <h4 className='text-gray-800 font-semibold'>{service.plan}</h4>
                <p className='text-gray-600 text-sm'>{service.amount}</p>
              </div>
            </div>
            <div className='flex gap-2 text-2xl py-5 px-4 border-t-2 text-right'>
              <Link href={`/admin/panel/services/${service.id}`}>
                <FaEdit className='text-purple-500 hover:text-purple-700' />
              </Link>
              <FaTrash
                className='text-red-500 hover:text-red-700 cursor-pointer'
                onClick={() => handleDeleteService(service.id)}
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

export default AdminServicePage;
