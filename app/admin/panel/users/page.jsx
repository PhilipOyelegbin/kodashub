"use client";
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

      {error && (
        <h5 className='text-center text-red-600 mb-4'>
          Error: {error.message}
        </h5>
      )}

      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-left'>Name</th>
            <th className='text-left'>Email</th>
            <th className='text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.email}</td>
              <td className='flex gap-2 text-2xl'>
                <Link href={`/admin/panel/users/${user.email}`}>
                  <FaEdit className='text-purple-500 hover:text-purple-700' />
                </Link>
                <FaTrash
                  className='text-red-500 hover:text-red-700 cursor-pointer'
                  onClick={() => handleDeleteUser(user.email)}
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

export default AdminUserPage;
