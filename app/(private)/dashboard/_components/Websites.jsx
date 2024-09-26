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

      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-3'>
        {!website
          ? Array(6)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : website?.map((item) => (
              <div
                className='flex flex-col gap-1 w-full p-4 bg-slate-200 shadow-md rounded-md cursor-pointer hover:bg-purple-200 duration-300 ease-in-out'
                key={item.id}>
                <span>ID: {item.id}</span>
                <span>Plan: {item.plan}</span>
                <span>Domain: {item.domain}</span>
                <span>
                  Status: {item.status == false ? "In Progress" : "Completed"}
                </span>
                <span>Exp: {item.expiration}</span>
              </div>
            ))}
      </section>
    </section>
  );
};
