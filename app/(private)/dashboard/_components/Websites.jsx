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
              Expiration
            </th>
            <th
              scope='col'
              class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Status
            </th>
          </tr>
        </thead>
        <tbody class='bg-white divide-y divide-gray-200'>
          {website?.map((item) => (
            <tr key={item?.id}>
              <td class='px-6 py-4 whitespace-nowrap'>{item?.id}</td>
              <td class='px-6 py-4 whitespace-nowrap'>{item?.plan}</td>
              <td class='px-6 py-4 whitespace-nowrap'>{item?.domain}</td>
              <td class='px-6 py-4 whitespace-nowrap'>{item?.expiration}</td>
              <td class='px-6 text-center py-4 whitespace-nowrap border rounded-2xl w-fit bg-lime-500 text-white'>
                {item?.status == false ? "In Progress" : "Completed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
