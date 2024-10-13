"use client";
import Loading from "@/app/loading";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDomainPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleDeleteDomain = async (id) => {
    try {
      const response = await fetch(`/api/domain/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Deleted Successfully");
        setData((prevData) => prevData.filter((domain) => domain.id !== id));
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
        const response = await fetch(`/api/domain`);
        const result = await response.json();
        setData(result.data);
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
      <h2 className='text-3xl font-bold text-purple-600 mb-4'>Domains</h2>

      {data.length === 0 ? (
        <h5 className='text-center text-blue-600 mb-4'>No data to display</h5>
      ) : (
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left'>Plan</th>
              <th className='text-left'>Status</th>
              <th className='text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((domain) => (
              <tr key={domain.id}>
                <td>{domain.plan}</td>
                <td>{domain.status}</td>
                <td className='flex gap-2 text-2xl'>
                  <Link href={`/admin/panel/domains/${domain.id}`}>
                    <FaEdit className='text-purple-500 hover:text-purple-700' />
                  </Link>
                  <FaTrash
                    className='text-red-500 hover:text-red-700 cursor-pointer'
                    onClick={() => handleDeleteDomain(domain.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AdminDomainPage;
