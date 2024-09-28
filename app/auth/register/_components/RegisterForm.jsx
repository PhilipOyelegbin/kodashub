"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RegisterForm = () => {
  const navigate = useRouter();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          password: "",
        });
        navigate.push("/auth/login");
      } else {
        toast.error("An error occurred during registration.");
      }
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleRegister} className='auth-form'>
      <h3>Get Started with us!</h3>
      <div className='form-group'>
        <label htmlFor='first_name'>First name</label>
        <input
          type='text'
          name='first_name'
          id='first_name'
          className='p-2 rounded-md border w-full'
          value={user.first_name}
          onChange={handleChange}
          placeholder='Ada'
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='last_name'>Last name</label>
        <input
          type='text'
          name='last_name'
          id='last_name'
          className='p-2 rounded-md border w-full'
          value={user.last_name}
          onChange={handleChange}
          placeholder='Pamilerin'
          required
        />
      </div>
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
        <label htmlFor='phone_number'>Phone number</label>
        <input
          type='tel'
          name='phone_number'
          id='phone_number'
          className='p-2 rounded-md border w-full'
          value={user.phone_number}
          onChange={handleChange}
          placeholder='+2348123456789'
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
      <div className='flex gap-2 my-5'>
        <input type='checkbox' name='terms' id='terms' required />
        <label htmlFor='terms'>
          Accept our{" "}
          <Link href='/' className='text-purple-500'>
            Terms of service
          </Link>
        </label>
      </div>
      <button className='btn'>Sign Up</button>
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
