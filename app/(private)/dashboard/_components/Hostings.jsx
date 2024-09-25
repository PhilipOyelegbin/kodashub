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
      <table class='text-left min-w-full divide-y divide-gray-200 my-5'>
        <thead class='bg-purple-200'>
          <tr>
            <th
              scope='col'
              class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              ID
            </th>
            <th
              scope='col'
              class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Plan
            </th>
            <th
              scope='col'
              class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Domain
            </th>
            <th
              scope='col'
              class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Status
            </th>
            <th
              scope='col'
              class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Expiration
            </th>
          </tr>
        </thead>
        <tbody class='bg-white divide-y divide-gray-200'>
          {host?.map((item) => (
            <tr key={item?.id}>
              <td class='px-6 py-4 whitespace-nowrap'>{item?.id}</td>
              <td class='px-6 py-4 whitespace-nowrap'>{item?.plan}</td>
              <td class='px-6 py-4 whitespace-nowrap'>{item?.domain}</td>
              <td class='px-6 py-4 text-center whitespace-nowrap border rounded-2xl w-fit bg-lime-500 text-white'>
                {item?.status}
              </td>
              <td class='px-6 py-4 whitespace-nowrap'>{item?.expiration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
