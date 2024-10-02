"use client";
import Loading from "@/app/loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDomainPage() {
  const navigate = useRouter();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const handleDeleteDomain = async (id) => {
    try {
      const deleteDomain = await fetch(`/api/domain/${id}`, {
        method: "DELETE",
      });
      if (deleteDomain.ok) {
        toast.success("Deleted Successfully");
        navigate.refresh();
      } else {
        toast.error(deleteDomain?.statusText);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    fetch(`/api/domain`)
      .then((resp) => resp.json())
      .then((result) => setData(result?.data))
      .catch((err) => setError(err));
  }, []);

  return (
    <section className='p-3 bg-white rounded shadow-md'>
      <h2 className='text-3xl font-bold text-purple-600 mb-4'>Domains</h2>

      {!data ? (
        <Loading />
      ) : data?.length <= 0 ? (
        <h5 className='text-center text-blue-600 mb-4'>No data to display</h5>
      ) : (
        error && (
          <h5 className='text-center text-red-600 mb-4'>
            Error: {error.message}
          </h5>
        )
      )}

      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-left'>Plan</th>
            <th className='text-left'>Status</th>
            <th className='text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((domain) => (
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
