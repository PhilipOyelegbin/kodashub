import Link from "next/link";

export const Domains = () => {
  const domain = [
    {
      id: "1332",
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
    {
      id: "2245",
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
    {
      id: "39854",
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
    {
      id: "4068",
      plan: "Hosting Plan",
      domain: "domainname.com.ng",
      expiration: "12/07/2024",
      status: "Active",
    },
  ];

  return (
    <section className='text-center py-10'>
      <h3>My Domains</h3>
      {!domain ? (
        <p>Loading...</p>
      ) : (
        domain?.length <= 0 && <p>No domain found</p>
      )}
      <table className='text-left min-w-full divide-y divide-gray-200 my-5'>
        <thead className='bg-purple-200'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              ID
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Domain
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Expiration
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Status
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {domain?.map((item) => (
            <tr key={item?.id}>
              <td className='px-6 py-4 whitespace-nowrap'>{item?.id}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{item?.domain}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {item?.expiration}
              </td>
              <td className='px-6 text-center py-4 whitespace-nowrap border rounded-2xl w-fit bg-lime-500 text-white'>
                {item?.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
