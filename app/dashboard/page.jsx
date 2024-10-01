"use client";
import { Hostings } from "./_components/Hostings";
import { MyInvoices } from "./_components/MyInvoices";
import { Websites } from "./_components/Websites";

export default function DashboardPage() {
  return (
    <>
      <section className='space-y-5'>
        <Hostings />
        <Websites />
        <MyInvoices />
      </section>
    </>
  );
}
