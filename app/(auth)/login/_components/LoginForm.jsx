"use client";
import Link from "next/link";
import { useState } from "react";

export const LoginForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <form action='' onSubmit={handleLogin} className='auth-form'>
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
        <Link href='/reset' className='text-sm text-center block underline'>
          Forgot password?
        </Link>
      </div>
    </form>
  );
};
