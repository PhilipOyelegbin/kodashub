"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateHosting() {
  const header = usePathname();
  const navigate = useRouter();
  const [data, setData] = useState({
    name: "",
    price: "",
    status: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      fetch(`/api/hosting/${header.split("/")[4]}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      })
        .then((resp) => {
          if (resp.ok) {
            navigate.replace("/admin/panel/hostings");
          } else {
            toast.error(resp.statusText);
          }
        })
        .catch((err) => toast.error(err));
    } catch (err) {
      toast.error(err);
    }
  };

  useLayoutEffect(() => {
    fetch(`/api/hosting/${header.split("/")[4]}`)
      .then((resp) => resp.json())
      .then((result) =>
        setData({
          name: result?.data.name,
          price: result?.data.price,
          status: result?.data.status,
        })
      )
      .catch((err) => toast.error(err));
  }, [header]);

  return (
    <section className='p-5 bg-white rounded shadow-md'>
      <div className='flex-1'>
        <h2 className='text-3xl font-bold text-purple-600 mb-4'>
          Update a Hosting
        </h2>

        <form onSubmit={handleSave}>
          <label className='block mb-2'>
            <span className='text-gray-700'>Name</span>
            <input
              type='text'
              name='name'
              value={data.name}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>price</span>
            <input
              type='text'
              name='price'
              value={data.price}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>Status</span>
            <input
              type='text'
              name='status'
              value={data.status}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
            />
          </label>

          <div className='flex gap-5 items-center'>
            <button
              type='submit'
              className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
              Save
            </button>

            <Link
              href='/admin/panel/hostings'
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
