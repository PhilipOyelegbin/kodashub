"use client";
import { DesignPlans } from "@/app/utils/data";
import { FaCheckCircle } from "react-icons/fa";

function WebPricing() {
  const handleOrder = (name, price) => {
    const recipient = "contact@philipoyelegbin.com.ng";
    const subject = "KodasHub: New Design Order Placed";
    const message = `
    Hello,

    You recently placed an order for ${name} of the price ${price}.

    Kindly make payment to the account details below to complete your order. Once done respond to this mail with the proof of payment.

    - Account Name: KH_HQ
    - Account Number: 24039080598509595
    - Bank Name: Zenith Bank

    We hope to hear from you soon.
    
    Kindly regards,

    KodasHub Billing Team.
    `;
    const data = { recipient, subject, message };
    fetch("/api/mailer", { method: "POST", body: JSON.stringify(data) })
      .then((resp) => console.log(resp.json()))
      .catch((err) => console.log(err));
  };

  return (
    <section className='py-10 px-5 bg-purple-500 text-white lg:px-20'>
      <h3 className='text-center'>Choose Your Web Design Plan</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mt-4 gap-5'>
        {DesignPlans.map((item) => (
          <div
            className='flex flex-col gap-2 rounded-xl border border-slate-300 p-5 hover:bg-white hover:text-slate-700 duration-300 ease-linear'
            key={item.name}
          >
            <div className='h-32 border-b-2 border-slate-300 pb-3'>
              <h4>{item.name}</h4>
              <h4 className='py-3'>{item.price}</h4>
              <p>{item.description}</p>
            </div>
            <ul className='space-y-3 list-inside list-disc font-light'>
              {item.features.map((list, index) => (
                <li className='flex items-center gap-1' key={index}>
                  <FaCheckCircle className='text-slate-700 text-xl' /> {list}
                </li>
              ))}
            </ul>
            <button
              className='btn'
              onClick={() => handleOrder(item.name, item.price)}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WebPricing;
