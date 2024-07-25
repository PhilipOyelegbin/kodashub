import { Domains } from "./_components/Domains";
import { Hostings } from "./_components/Hostings";

const Dashboard = () => {
  return (
    <article>
      <Hostings />
      <Domains />
    </article>
  );
};

export default Dashboard;
