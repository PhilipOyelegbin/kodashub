import Link from "next/link";

export const Invoices = () => {
  const invoice = [
    {
      id: 2314,
      price: "N24,000",
      expiration: "12/07/2024",
      status: "Paid",
    },
    {
      id: 2314,
      price: "N24,000",
      expiration: "12/07/2024",
      status: "Paid",
    },
    {
      id: 2314,
      price: "N24,000",
      expiration: "12/07/2024",
      status: "Paid",
    },
    {
      id: 2314,
      price: "N24,000",
      expiration: "12/07/2024",
      status: "Paid",
    },
  ];

  return (
    <section className='text-center py-10'>
      <h3>My Invoice</h3>
      <div>
        {invoice?.map((list, i) => (
          <Link
            href={i.toString()}
            key={i}
            className='grid grid-cols-2 gap-3 items-center lg:grid-cols-3 py-2 border-b'
          >
            <p>{list.id}</p>
            <p>{list.price}</p>
            <p className='px-5 py-2 border rounded-2xl w-fit bg-lime-500 text-white'>
              {list.status}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
