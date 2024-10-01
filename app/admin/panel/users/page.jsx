"use client";
import Loading from "@/app/loading";
import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminUserPage() {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const handleDeleteUser = async (email) => {
    try {
      const deleteUser = await fetch(`/api/users/${email}`, {
        method: "DELETE",
      });
      if (deleteUser.ok) {
        toast.success("Deleted Successfully");
      } else {
        toast.error(deleteUser?.statusText);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    fetch(`/api/users`)
      .then((resp) => resp.json())
      .then((result) => setData(result?.data))
      .catch((err) => setError(err));
  }, []);

  return (
    <section className='p-3 bg-white rounded shadow-md'>
      <h2 className='text-3xl font-bold text-purple-600 mb-4'>Users</h2>

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
        {data?.map((user) => (
          <li className='rounded-md bg-purple-100' key={user.id}>
            <div className='flex text-center justify-center p-4'>
              <div className='space-y-2'>
                {user.email}
                <h4 className='text-gray-800 font-semibold'>
                  {user.first_name} {user.last_name}
                </h4>
                <p className='text-gray-600 text-sm'>{user.phone_number}</p>
              </div>
            </div>
            <div className='flex gap-2 text-2xl py-2 px-4 border-t-2 text-right'>
              <Link href={`/admin/panel/users/${user.email}`}>
                <FaEdit className='text-purple-500 hover:text-purple-700' />
              </Link>
              <FaTrash
                className='text-red-500 hover:text-red-700 cursor-pointer'
                onClick={() => handleDeleteUser(user.email)}
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

export default AdminUserPage;
