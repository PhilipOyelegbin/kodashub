"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResetPassword = () => {
  const route = useRouter();
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/reset-password", {
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
          onChange={handleChange}
          placeholder='XXXXXXXXX'
          required
        />
      </div>

      <button className='btn'>Submit</button>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </form>
  );
};
