"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateDomain() {
  const header = usePathname();
  const navigate = useRouter();
  const [data, setData] = useState({
    plan: "",
    description: "",
    amount: "",
    features: "",
    category: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/services/${header.split("/")[4]}`, {
        method: "PATCH",
        body: JSON.stringify({
          plan: data?.plan,
          description: data.description,
          amount: parseInt(data.amount),
          features: data.features,
          category: data.category,
        }),
      })
        .then((resp) => {
          if (resp.ok) {
            navigate.replace("/admin/panel/services");
          } else {
            toast.error("Error updating service");
          }
        })
        .catch((err) => toast.error(err));
    } catch (error) {
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    fetch(`/api/services/${header.split("/")[4]}`)
      .then((resp) => resp.json())
      .then((result) =>
        setData({
          plan: result?.data.plan,
          description: result?.data.description,
          amount: result?.data.amount,
          features: result?.data.features,
          category: result?.data.category,
        })
      )
      .catch((err) => toast.error(err));
  }, [header]);

  return (
    <section className='p-5 bg-white rounded shadow-md'>
      <div className='flex-1'>
        <h2 className='text-3xl font-bold text-purple-600 mb-4'>
          Update a Service
        </h2>

        <form onSubmit={handleSave}>
          <label className='block mb-2'>
            <span className='text-gray-700'>Plan</span>
            <input
              type='text'
              name='plan'
              value={data.plan}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>Description</span>
            <input
              type='text'
              name='description'
              value={data.description}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>Amount</span>
            <input
              type='number'
              name='amount'
              value={data.amount}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>Featires</span>
            <input
              type='text'
              name='features'
              value={data.features}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>
              Category:{" "}
              <span className='text-blue-400 text-xs'>{data.category}</span>
            </span>
            <select
              name='category'
              id='category'
              className='w-full p-2 pl-10 text-sm border border-gray-400 rounded-md'
              value={data.category}
              onChange={handleChange}>
              <option value='UNCATEGORIZED'>Uncategorized</option>
              <option value='DOMAIN'>Domain</option>
              <option value='HOSTING'>Hosting</option>
              <option value='DEVELOPMENT'>Development</option>
            </select>
          </label>

          <div className='flex gap-5 items-center'>
            <button
              type='submit'
              className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
              Save
            </button>

            <Link
              href='/admin/panel/services'
              className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>
              Cancel
            </Link>
          </div>
        </form>
      </div>

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
