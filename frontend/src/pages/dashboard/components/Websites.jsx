import { Skeleton } from "../../../components/Skeleton";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Websites = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    fetch(`${import.meta.env.VITE_API_URI}/api/website/${user}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    })
      .then((resp) => resp.json())
      .then((result) => setData(result.userWebsite))
      .catch((error) => toast.error(error));
  }, []);

  return (
    <div className='text-center p-5 bg-white rounded-md'>
      <h3>My Websites</h3>

      {data?.length <= 0 && <p>No website found</p>}

      <ul className='relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3'>
        {!data
          ? Array(6)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : data?.map((item) => (
              <li className='rounded-md bg-purple-100' key={item.id}>
                <div className='flex items-start justify-between p-4'>
                  <div className='space-y-2 w-full'>
                    <span>{item.id}</span>
                    <h4 className='text-gray-800 font-semibold'>{item.name}</h4>
                    <p className='text-gray-600 text-sm'>{item.price}</p>
                  </div>
                </div>
                <div className='flex justify-between py-2 px-4 border-t text-right'>
                  <span
                    className={`text-sm w-fit px-2 py-1 text-white rounded-lg ${
                      item.status ? "bg-lime-500" : "bg-blue-500"
                    }`}>
                    {item.status ? "Completed" : "Inprogress"}
                  </span>
                  <span>{item.updatedAt.split("T")[0] || "undefined"}</span>
                </div>
                {item.url !== " " && (
                  <Link
                    href={item.url || "/"}
                    className='block px-3 py-3 mb-2 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'>
                    Preview
                  </Link>
                )}
              </li>
            ))}
      </ul>
    </div>
  );
};
