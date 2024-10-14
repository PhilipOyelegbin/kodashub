import { useState, useEffect } from "react";
import { FaEdit, FaPlusSquare, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { getInvoice } from "../components/action";
import Loading from "../../../components/loading";
import { Link } from "react-router-dom";

function AdminInvoicePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleDeleteInvoice = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}/api/invoice/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Deleted Successfully");
        setData((prevData) => prevData.filter((item) => item.id !== id));
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
        const response = await getInvoice();
        if (response.ok) {
          const result = await response.json();
          setData(result.invoice);
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
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-purple-600 mb-4'>Invoices</h2>
        <Link to='/panel/invoices/new'>
          <FaPlusSquare className='text-blue-500 hover:text-blue-700 text-2xl' />
        </Link>
      </div>

      {data.length === 0 ? (
        <h5 className='text-center text-blue-600 mb-4'>No data to display</h5>
      ) : (
        <ul className='relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {data.map((item) => (
            <li className='rounded-md bg-purple-100' key={item.id}>
              <div className='flex text-center justify-center p-4'>
                <div className='space-y-2'>
                  <span
                    className={`text-xs font-bold ${
                      item.status ? "text-lime-500" : "text-red-500"
                    }`}>
                    {item.status ? "Active" : "Inactive"}
                  </span>
                  <p>{item.id}</p>
                  <h4 className='text-gray-800 font-semibold'>{item.name}</h4>
                  <p className='text-gray-600 text-sm'>₦{item.price}</p>
                </div>
              </div>
              <div className='flex gap-2 text-2xl py-2 px-4 border-t-2 text-right'>
                <Link to={`/panel/invoices/${item.id}`}>
                  <FaEdit className='text-purple-500 hover:text-purple-700' />
                </Link>
                <FaTrash
                  className='text-red-500 hover:text-red-700 cursor-pointer'
                  onClick={() => handleDeleteInvoice(item.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default AdminInvoicePage;
