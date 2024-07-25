import Link from "next/link";

export const Hostings = () => {
  const host = [
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
      <h3>My Hosting Services</h3>
      <div>
        {host?.map((list, i) => (
          <Link
            href={i.toString()}
            key={i}
            className='grid grid-cols-2 gap-3 items-center lg:grid-cols-4 py-2 border-b'
          >
            <p>{list.plan}</p>
            <p>{list.domain}</p>
            <p>{list.expiration}</p>
            <p className='px-5 py-2 border rounded-2xl w-fit'>{list.status}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
