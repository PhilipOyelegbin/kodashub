"use client";
import HostPricing from "./_components/HostPricing";
import WebPricing from "./_components/WebPricing";

function Service() {
  return (
    <section className='space-y-5'>
      <HostPricing />
      <WebPricing />
    </section>
  );
}

export default Service;
