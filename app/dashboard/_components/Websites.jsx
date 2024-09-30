import { Skeleton } from "@/app/components/Skeleton";
import Link from "next/link";

export const Websites = () => {
  const website = [
    {
      id: "1332",
      plan: "Basic Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: true,
    },
    {
      id: "2245",
      plan: "Pro Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: false,
    },
    {
      id: "39854",
      plan: "Executive Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: true,
    },
  ];

  return (
    <section className='text-center py-10'>
      <h3>My Websites</h3>

      {website?.length <= 0 && <p>No website found</p>}

      <ul className='relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3'>
        {!website
          ? Array(6)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : website?.map((item) => (
              <li className='rounded-md bg-purple-100' key={item.id}>
                <div className='flex items-start justify-between p-4'>
                  <div className='space-y-2'>
                    {item.id}
                    <h4 className='text-gray-800 font-semibold'>
                      {item.domain}
                    </h4>
                    <p className='text-gray-600 text-sm'>{item.plan}</p>
                    <p className='text-gray-600 text-sm'>{item.expiration}</p>
                  </div>
                </div>
                <div className='flex justify-between py-5 px-4 border-t text-right'>
                  <span>
                    {item.status == false ? "In Progress" : "Completed"}
                  </span>
                  {/* <span>{item?.createdAt.split("T")[0] || "undefined"}</span> */}
                </div>
              </li>
            ))}
      </ul>
    </section>
  );
};
