import dynamic from "next/dynamic";

const Datapool = dynamic(() => import("./_components/Datapool"), {
  ssr: false,
});
const Ticket = dynamic(() => import("./_components/Ticket"), {
  ssr: false,
});

export default function DashboardPage() {
  return (
    <section className='space-y-5'>
      <Datapool />
      <Ticket />
    </section>
  );
}
