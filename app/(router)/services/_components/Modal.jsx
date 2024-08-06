"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export const HostingModal = (name, price) => {
  const { data, setData } = useState({
    recipient: "",
    subject: "KodasHub: New Hosting Order Placed",
    message: `
    Hello,

    You recently placed an order for name of the price price.

    Kindly make payment to the account details below to complete your order. Once done respond to this mail with the proof of payment.

    - Account Name: KH_HQ
    - Account Number: 24039080598509595
    - Bank Name: Zenith Bank

    We hope to hear from you soon.
    
    Kindly regards,

    KodasHub Billing Team.
    `,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSend = (e) => {
    e.preventDefault();

    fetch("/api/mailer", { method: "POST", body: JSON.stringify(data) })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  return (
    <div className='absolute left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-90'>
      <FaTimes className='text-2xl text-white cursor-pointer absolute right-5 top-5' />
      <form
        onSubmit={handleSend}
        className='flex flex-col gap-2 w-10/12 md:w-2/4 xl:w-2/5 mx-auto'
      >
        <input
          type='email'
          className='border rounded-md p-2'
          name='recipient'
          placeholder='Enter your email'
          value={data}
          onChange={handleChange}
        />
        <button type='submit' className='btn'>
          Send Order
        </button>
      </form>
    </div>
  );
};
