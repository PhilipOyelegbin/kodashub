import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { name, price } = await req.json();

  if (!name || !price) {
    return NextResponse.json(
      { message: "A required field is missing!" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name },
            unit_amount: parseInt(price) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.HOST_URI}/dashboard/feedback`,
      cancel_url: `${process.env.HOST_URI}`,
    });

    return NextResponse.json(
      { message: "Payment gatway received", path: session.url },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
