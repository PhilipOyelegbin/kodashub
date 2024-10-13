import Datapool from "./components/Datapool";
import Ticket from "./components/Ticket";

export default function DashboardPage() {
  return (
    <section className='space-y-5'>
      <Datapool />
      <Ticket />
    </section>
  );
}
