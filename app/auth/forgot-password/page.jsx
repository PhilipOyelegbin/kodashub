"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ForgotPassword = () => {
  const route = useRouter();
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail({ [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/forgot-password", {
        method: "PATCH",
        bocy: JSON.stringify(email),
      })
        .then((resp) => {
          if (resp?.ok) {
            route.replace("/auth/reset-password");
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
    <form onSubmit={handleSend} className='auth-form'>
      <h3>Forgot password</h3>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          className='p-2 rounded-md border w-full'
          value={email}
          onChange={handleChange}
          placeholder='adapam@gmail.com'
          required
        />
      </div>

      <button className='btn'>Send</button>
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
