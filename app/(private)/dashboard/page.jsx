import { Hostings } from "./_components/Hostings";
import { MyInvoices } from "./_components/MyInvoices";
import { Websites } from "./_components/Websites";

const Dashboard = () => {
  return (
    <article>
      <Hostings />
      <Websites />
      <MyInvoices />
    </article>
  );
};

export default Dashboard;
