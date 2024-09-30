import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { plan, description, amount, features } = await req.json();

  if (!plan || !description || !amount || !features) {
    return NextResponse.json(
      { message: "All field are required" },
      { status: 400 }
    );
  }

  try {
    const result = await prisma.offerings.create({
      data: {
        plan,
        description,
        amount: parseInt(amount),
        features: features?.split(","),
      },
    });
    return NextResponse.json(
      { message: "User fetched successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await prisma.offerings.findMany();
    return NextResponse.json(
      { message: "Offerings fetched successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
