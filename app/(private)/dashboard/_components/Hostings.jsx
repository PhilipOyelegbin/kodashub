import { Skeleton } from "@/app/components/Skeleton";
import Link from "next/link";

export const Hostings = () => {
  const host = [
    {
      id: "133ur98",
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
    {
      id: "23ip24",
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
    {
      id: "3o44",
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
    {
      id: "49448",
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
  ];

  return (
    <section className='text-center py-10'>
      <h3>My Hosting Services</h3>

      {host?.length <= 0 && <p>No hosting service found</p>}

      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-3'>
        {!host
          ? Array(6)
              .fill(0)
              .map((d, index) => <Skeleton key={index} />)
          : host?.map((item) => (
              <div
                className='flex flex-col gap-1 w-full p-4 bg-slate-200 shadow-md rounded-md cursor-pointer hover:bg-purple-200 duration-300 ease-in-out'
                key={item.id}>
                <span>ID: {item.id}</span>
                <span>Plan: {item.plan}</span>
                <span>Domain: {item.domain}</span>
                <span>Status: {item.status}</span>
                <span>Exp: {item.expiration}</span>
              </div>
            ))}
      </section>
    </section>
  );
};
