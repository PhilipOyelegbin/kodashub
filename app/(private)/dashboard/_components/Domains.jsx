import Link from "next/link";

export const Domains = () => {
  const domain = [
    {
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
    {
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
    {
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
    {
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
  ];

  return (
    <section className='text-center py-10'>
      <h3>My Domains</h3>
      <div>
        {domain?.map((list, i) => (
          <Link
            href={i.toString()}
            key={i}
            className='grid grid-cols-2 gap-3 items-center lg:grid-cols-3 py-2 border-b'
          >
            <p>{list.domain}</p>
            <p>{list.expiration}</p>
            <p className='px-5 py-2 border rounded-2xl w-fit bg-lime-500 text-white'>
              {list.status}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
