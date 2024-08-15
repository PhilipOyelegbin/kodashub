import { Domains } from "./_components/Domains";
import { Hostings } from "./_components/Hostings";
import { Invoices } from "./_components/Invoices";

const Dashboard = () => {
  return (
    <article>
      <Hostings />
      <Domains />
      <Invoices />
    </article>
  );
};

export default Dashboard;
