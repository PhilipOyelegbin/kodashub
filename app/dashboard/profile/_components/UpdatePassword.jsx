"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UpdatePassword = () => {
  const [user, setUser] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `/api/users/${sessionStorage.getItem("user")}`,
        {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setUser({
          password: "",
        });
        toast.success("Password update successfully");
      } else {
        toast.error("An error occurred during password update.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className='auth-form h-fit p-5 bg-white rounded-md'>
      <h3>Change your password</h3>
      <div className='form-group'>
        <label htmlFor='password'>New Password</label>
        <input
          type='password'
          name='password'
          id='password'
          className='p-2 rounded-md border w-full'
          value={user.password}
          onChange={handleChange}
          placeholder='XXXXXXXXXXXXX'
        />
      </div>

      <button className='btn'>Update</button>
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
