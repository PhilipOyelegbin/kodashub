import { Skeleton } from "../../../components/Skeleton";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MyInvoices = () => {
  const [data, setData] = useState();

  const handlePayment = async (id, email, price) => {
    const payment = { id, email, price };
    try {
      await fetch(`${import.meta.env.VITE_API_URI}/api/checkout`, {
        method: "POST",
        body: JSON.stringify(payment),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((result) => (window.location.href = result?.path))
        .catch((err) => toast.error(err));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const user = sessionStorage?.getItem("user");
    fetch(`${import.meta.env.VITE_API_URI}/api/invoice/${user}`)
      .then((resp) => resp.json())
      .then((result) => setData(result.userInvoice))
      .catch((error) => toast.error(error));
  }, []);

  return (
    <div className='text-center p-5 bg-white rounded-md'>
      <h3>My Invoices</h3>

      {data?.length <= 0 && <p>No invoice found</p>}

      <ul className='relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3'>
        {!data
          ? Array(6)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : data?.map((item) => (
              <li
                className='rounded-md bg-purple-100 cursor-pointer'
                key={item.id}
                onClick={() =>
                  handlePayment(
                    item.id,
                    sessionStorage?.getItem("user"),
                    item.price
                  )
                }>
                <div className='flex items-start justify-between p-4'>
                  <div className='space-y-2 w-full'>
                    <span>{item.id}</span>
                    <h4 className='text-gray-800 font-semibold'>{item.name}</h4>
                    <p className='text-gray-600'>₦{item.price}</p>
                  </div>
                </div>
                <div className='flex justify-between py-2 px-4 border-t text-right'>
                  <span
                    className={`text-sm w-fit px-2 py-1 text-white rounded-lg ${
                      item.status ? "bg-lime-500" : "bg-red-500"
                    }`}>
                    {item.status == false ? "Unpaid" : "Paid"}
                  </span>
                  <span>{item?.updatedAt.split("T")[0]}</span>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};
