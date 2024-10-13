"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const route = useRouter();
  const token = useSearchParams();
  const [formInput, setFormInput] = useState({ password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/forgot-password/${token.get("token")}`, {
        method: "PATCH",
        body: JSON.stringify(formInput),
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
      toast.error(error.message);
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
            value={formInput.password}
            onChange={(e) =>
              setFormInput({ ...formInput, [e.target.name]: e.target.value })
            }
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
