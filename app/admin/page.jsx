"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Verify } from "../utils/middleware";

function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authenticate = await Verify(username, password);

    if (authenticate) {
      localStorage.setItem("ssp", process.env.SSP);
      navigate.replace("/admin/panel");
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <article className='h-screen flex justify-center items-center bg-purple-100'>
      <div className='max-w-md w-full p-4 bg-white rounded shadow-md'>
        <h2 className='text-3xl font-bold text-purple-600 mb-4'>Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <label className='block mb-2'>
            <span className='text-gray-700'>Username</span>
            <input
              type='text'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className='w-full p-2 pl-10 text-sm text-gray-700'
              placeholder='Enter username'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>Password</span>
            <input
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className='w-full p-2 pl-10 text-sm text-gray-700'
              placeholder='Enter password'
            />
          </label>
          <button
            type='submit'
            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
            Login
          </button>
        </form>
      </div>

      <ToastContainer
        position='top-right'
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </article>
  );
}

export default AdminLoginPage;
