"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginForm = () => {
  const route = useRouter();
  const session = useSession();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
      });

      if (res?.error) {
        toast.error("Invalid details!");
      } else if (res?.url) {
        sessionStorage.setItem("user", user?.email);
        route.replace("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useLayoutEffect(() => {
    if (session?.status === "authenticated") {
      route.replace("/dashboard");
    }
  }, [session, route]);

  return (
    <form onSubmit={handleLogin} className='auth-form'>
      <h3>Welcome back!</h3>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          className='p-2 rounded-md border w-full'
          value={user.email}
          onChange={handleChange}
          placeholder='adapam@gmail.com'
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          className='p-2 rounded-md border w-full'
          value={user.password}
          onChange={handleChange}
          placeholder='XXXXXXXXXX'
          required
        />
      </div>
      <div className='flex flex-col items-center gap-5 lg:flex-row lg:justify-between'>
        <button className='btn'>Sign In</button>
        <Link
          href='/auth/forgotpassword'
          className='text-sm text-center block underline'>
          Forgot password?
        </Link>
      </div>

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
