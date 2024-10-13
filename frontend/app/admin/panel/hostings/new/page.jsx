"use client";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateService() {
  const [user, setUser] = useState();
  const [data, setData] = useState({
    name: "",
    url: "",
    price: "",
    expiration: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.API_URI}/api/hosting/${user}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((resp) => {
          if (resp.ok) {
            toast.success("Hosting created successfully");
            setData({
              name: "",
              url: "",
              price: "",
              expiration: "",
            });
            setUser("");
          } else {
            toast.error(resp.statusText);
          }
        })
        .catch((err) => toast.error(err));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className='p-5 bg-white rounded shadow-md flex gap-5 justify-center'>
      <div className='flex-1'>
        <h2 className='text-3xl font-bold text-purple-600 mb-4'>
          Create a new hosting service
        </h2>

        <form onSubmit={handleSave}>
          <label className='block mb-2'>
            <span className='text-gray-700'>User</span>
            <input
              type='email'
              name='user'
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
              placeholder='example@mail.com'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>Name</span>
            <input
              type='text'
              name='name'
              value={data.name}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
              placeholder='Bronze Plan'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>Price</span>
            <input
              type='text'
              name='price'
              value={data.price}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
              placeholder='300000'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>URL</span>
            <input
              type='url'
              name='url'
              value={data.url}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
              placeholder='https://'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>Expiration Date</span>
            <input
              type='text'
              name='expiration'
              value={data.expiration}
              onChange={handleChange}
              className='w-full p-2 pl-10 text-sm text-gray-700 border border-gray-400 rounded-md outline-none'
              placeholder='yy/mm/dd'
            />
          </label>

          <button
            type='submit'
            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
            Save
          </button>
        </form>
      </div>

      <div className='hidden md:block flex-1'>
        <Image
          src='/va.png'
          className='object-fill w-full h-full'
          width={300}
          height={300}
          alt='banner'
        />
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
