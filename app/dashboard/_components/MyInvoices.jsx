"use client";
import { Skeleton } from "@/app/components/Skeleton";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MyInvoices = () => {
  const [data, setData] = useState();
  const navigate = useRouter();

  const handlePayment = async (name, price) => {
    const payment = { name, price };
    try {
      await fetch("/api/checkout", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payment),
      })
        .then((response) => response.json())
        .then((result) => navigate.replace(result?.path))
        .catch((err) => toast.error(err));
    } catch (error) {
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    fetch(`/api/invoices/${sessionStorage.getItem("user")}`)
      .then((resp) => resp.json())
      .then((result) => setData(result.data))
      .catch((error) => toast.error(error));
  }, [sessionStorage.getItem("user")]);

  return (
    <div className='text-center py-10'>
      <h3>My Invoices</h3>

      {data?.length <= 0 && <p>No invoice found</p>}

      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-3'>
        {!data
          ? Array(6)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : data?.map((invoice) => (
              <div
                className='flex flex-col gap-1 w-full p-4 bg-slate-200 shadow-md rounded-md cursor-pointer hover:bg-purple-200 duration-300 ease-in-out'
                key={invoice.id}
                onClick={() => handlePayment(invoice.name, invoice.price)}>
                <span>ID: {invoice.id.split("-")[0]}</span>
                <span>Item: {invoice.name}</span>
                <span>Price: ₦{invoice.price}</span>
                <span>
                  Status: {invoice.status == false ? "Unpaid" : "Paid"}
                </span>
                <span>Date: {invoice.createdAt.split("T")[0]}</span>
              </div>
            ))}
      </section>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
};
