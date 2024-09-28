"use client";
import { DesignPlans } from "@/app/utils/data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WebPricing() {
  const session = useSession();
  const route = useRouter();

  const handleOrder = async (name, price) => {
    if (session?.status === "authenticated") {
      const user = sessionStorage.getItem("user");
      const recipient = [user, "contact@philipoyelegbin.com.ng"];
      const subject = "KodasHub: New Web Design Order Placed";
      const message = `
      Hello,
  
      Thank you for your interest in our services.

      We would like to confirm that you recently placed an order for ∗∗${name}∗∗ at the price of ∗∗₦${price}**. To proceed with the payment, please log in to your account and navigate to the billing section. You can complete the payment by clicking on the generated invoice.

      If you have any questions or require assistance, please don't hesitate to reach out.

      Best regards,
  
      KodasHub.
      `;
      try {
        const invoice = {
          name,
          price,
        };
        await fetch(`/api/invoices/${user}`, {
          method: "POST",
          body: JSON.stringify(invoice),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = { recipient, subject, message };
        await fetch("/api/mailer", {
          method: "POST",
          body: JSON.stringify(data),
        });
        toast.success("Invoice generated.");
        route.push("/dashboard/billing");
      } catch (error) {
        toast.error(error);
      }
    } else {
      route.replace("/auth/login");
    }
  };

  return (
    <section className='py-10 px-5 bg-purple-500 text-white lg:px-20'>
      <h3 className='text-center'>Choose Your Web Design Plan</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mt-4 gap-5'>
        {DesignPlans.map((item) => (
          <div
            className='flex flex-col gap-2 rounded-xl border border-slate-300 p-5 hover:bg-white hover:text-slate-700 duration-300 ease-linear'
            key={item.name}>
            <div className='h-32 border-b-2 border-slate-300 pb-3'>
              <h4>{item.name}</h4>
              <h4 className='py-3'>₦{item.price}</h4>
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
              onClick={() => handleOrder(item.name, item.price)}>
              Purchase
            </button>
          </div>
        ))}
      </div>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </section>
  );
}

export default WebPricing;
