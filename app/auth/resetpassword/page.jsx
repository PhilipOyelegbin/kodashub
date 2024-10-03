"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const route = useRouter();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/reset-password`, {
        method: "PATCH",
        bocy: JSON.stringify(password),
      })
        .then((resp) => {
          if (resp?.ok) {
            route.replace("/auth/login");
          } else {
            toast.error(resp.statusText);
          }
        })
        .catch((err) => toast.error(err));
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <article className='bg-purple-100 h-screen flex justify-center items-center py-10 px-5 lg:px-20'>
      <form onSubmit={handleSubmit} className='auth-form'>
        <h3>Reset password</h3>
        <div className='form-group'>
          <label htmlFor='password'>New Password</label>
          <input
            type='password'
            name='password'
            id='password'
            className='p-2 rounded-md border w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='XXXXXXXXX'
            required
          />
        </div>

        <button className='btn'>Submit</button>
      </form>

      <ToastContainer
        position='top-right'
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </article>
  );
};

export default ResetPassword;
