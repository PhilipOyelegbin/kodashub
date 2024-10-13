"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../_components/action";
import Loading from "@/app/loading";

function AdminUserPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleDeleteUser = async (email) => {
    try {
      const response = await fetch(
        `${process.env.API_URI}/api/users/${email}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Deleted Successfully");
        setData((prevData) => prevData.filter((user) => user.email !== email));
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser();
        if (response.ok) {
          const result = await response.json();
          setData(result.users);
        } else {
          setError(response.statusText);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <h5 className='text-center text-red-600 mb-4'>Error: {error}</h5>;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <section className='p-3 bg-white rounded shadow-md'>
      <h2 className='text-3xl font-bold text-purple-600 mb-4'>Users</h2>

      {data.length === 0 ? (
        <h5 className='text-center text-blue-600 mb-4'>No data to display</h5>
      ) : (
        <ul className='relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {data.map((user) => (
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
      )}

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
