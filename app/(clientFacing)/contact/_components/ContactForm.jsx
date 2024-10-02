"use client";
import { useState } from "react";

function ContactForm() {
  const [data, setData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendMail = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={sendMail}
      className='flex flex-col gap-5 w-full max-w-[550px] border border-purple-700 p-5 rounded-xl'>
      <h3>Questions or Feedback?</h3>
      <input
        type='text'
        name='full_name'
        value={data.full_name}
        onChange={handleChange}
        className='form-input'
        placeholder='Enter your full name'
      />
      <input
        type='email'
        name='email'
        value={data.email}
        onChange={handleChange}
        className='form-input'
        placeholder='Enter your email address'
      />
      <textarea
        name='message'
        value={data.message}
        onChange={handleChange}
        className='form-input resize-y'
        cols={30}
        rows={5}
        placeholder='Enter your email address'></textarea>
      <button className='btn'>Send</button>
    </form>
  );
}

export default ContactForm;
