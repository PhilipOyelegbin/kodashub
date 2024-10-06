import { NextResponse } from "next/server";

export async function POST(req) {
  const { id, email, price } = await req.json();

  if (!id || !email || !price) {
    return NextResponse.json(
      { message: "A required field is missing!" },
      { status: 400 }
    );
  }

  try {
    const params = JSON.stringify({
      reference: id,
      email,
      amount: price * 100,
      channels: ["card", "bank_transfer"],
    });

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        body: params,
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (!result.status) {
      throw new Error("Network error encountered!");
    }

    return NextResponse.json(
      {
        message: "Payment gatway received",
        path: result.data.authorization_url,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
