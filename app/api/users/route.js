import { prisma } from "@/config/db";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { first_name, last_name, email, phone_number, password } =
      await req.json();

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        password: hashedPassword,
      },
      include: {
        hosting: true,
        development: true,
        invoices: true,
      },
    });

    return NextResponse.json(
      { message: "Saved successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await prisma.user.findMany({
      include: {
        hosting: true,
        development: true,
        invoices: true,
      },
    });
    return NextResponse.json(
      { message: "User fetched successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
