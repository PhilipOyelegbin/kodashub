import Datapool from "./_components/Datapool";
import Ticket from "./_components/Ticket";

export default function DashboardPage() {
  return (
    <section className='space-y-5'>
      <Datapool />
      <Ticket />
    </section>
  );
}
