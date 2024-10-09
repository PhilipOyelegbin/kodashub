"use client";
import { Skeleton } from "@/app/components/Skeleton";
import { useState, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export const Hostings = () => {
  const [data, setData] = useState();

  useLayoutEffect(() => {
    const user = sessionStorage.getItem("user");
    fetch(`/api/hosting/${user}`)
      .then((resp) => resp.json())
      .then((result) => setData(result.data))
      .catch((error) => toast.error(error));
  }, []);

  return (
    <div className='text-center p-5 bg-white rounded-md'>
      <h3>My Hosting Services</h3>

      {data?.length <= 0 && <p>No hosting service found</p>}

      <ul className='relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3'>
        {!data
          ? Array(6)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : data?.map((item) => (
              <li className='rounded-md bg-purple-100' key={item.id}>
                <Link href={item.url || "/"}>
                  <div className='flex items-start justify-between p-4'>
                    <div className='space-y-2 w-full'>
                      <span>{item.id}</span>
                      <h4 className='text-gray-800 font-semibold'>
                        {item.name}
                      </h4>
                      <p className='text-gray-600 text-sm'>₦{item.price}</p>
                    </div>
                  </div>
                  <div className='flex justify-between py-2 px-4 border-t-2 text-right'>
                    <span
                      className={`text-sm w-fit px-2 py-1 text-white rounded-lg ${
                        item.status ? "bg-lime-500" : "bg-red-500"
                      }`}>
                      {item.status ? "Active" : "Inactive"}
                    </span>
                    <span>{item.expiration}</span>
                  </div>
                </Link>
              </li>
            ))}
      </ul>

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
