"use client";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@/app/components/Skeleton";

function WebPricing() {
  const route = useRouter();
  const [data, setData] = useState();
  const [error, setError] = useState("");

  const handleOrder = async (name, price) => {
    if (sessionStorage.getItem("user")) {
      const recipient = sessionStorage.getItem("user");
      const subject = "KodasHub: New Web Design Order Placed";
      const message = `
      <p>Hello,</p>

      <p>Thank you for your interest in our services.</p>

      <p>We would like to confirm that you recently placed an order for <b>${name}</b> at the price of <b>₦${price}</b>. To proceed with the payment, please log in to your account and navigate to the billing section. You can complete the payment by clicking on the generated invoice.</p>

      <p>If you have any questions or require assistance, please don't hesitate to reach out.</p>

      <p>Best regards,</p>

      <p>KodasHub Support</p>
      `;
      try {
        const invoice = {
          name,
          price,
        };
        await fetch(`${process.env.API_URI}/api/invoice/${recipient}`, {
          method: "POST",
          body: JSON.stringify(invoice),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = { recipient, subject, message };
        await fetch(`${process.env.API_URI}/api/servicemail`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          s,
        });
        toast.success("Invoice generated.");
        route.push("/dashboard/billing");
      } catch (error) {
        toast.error(error);
      }
    } else {
      route.replace("/auth/login");
    }
  };

  useLayoutEffect(() => {
    fetch(`${process.env.API_URI}/api/service`)
      .then((resp) => resp.json())
      .then((result) => setData(result.service))
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return <h5 className='text-center text-red-600 mb-4'>Error: {error}</h5>;
  }

  return (
    <div className='p-5 bg-white rounded-md text-gray-600'>
      <div className='relative max-w-xl mx-auto sm:text-center'>
        <h3 className='text-purple-600 text-3xl font-semibold sm:text-4xl'>
          Pricing for all website design plan
        </h3>
      </div>
      <div className='mt-8 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
        {!data
          ? Array(3)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : data
              ?.filter((item) => item.category === "DEVELOPMENT")
              ?.map((item) => (
                <div
                  key={item.id}
                  className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2'>
                  <div>
                    <span className='text-indigo-600 font-medium'>
                      {item.plan}
                    </span>
                    <div className='mt-4 text-gray-800 text-3xl font-semibold'>
                      ₦{item.amount}{" "}
                      <span className='text-xs text-gray-600 font-normal'>
                        one time payment
                      </span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                  <ul className='py-8 space-y-3'>
                    {item.features.map((featureItem, idx) => (
                      <li key={idx} className='flex items-center gap-5'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5 text-indigo-600'
                          viewBox='0 0 20 20'
                          fill='currentColor'>
                          <path
                            fill-rule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clip-rule='evenodd'></path>
                        </svg>
                        {featureItem}
                      </li>
                    ))}
                  </ul>
                  <div className='flex-1 flex items-end'>
                    <button
                      className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'
                      onClick={() => handleOrder(item.plan, item.amount)}>
                      Order
                    </button>
                  </div>
                </div>
              ))}
      </div>

      <ToastContainer
        position='top-right'
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
}

export default WebPricing;
