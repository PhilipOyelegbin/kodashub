import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req, params) {
  try {
    const body = await req.json();
    const {
      params: { email },
    } = params;

    if (!email) {
      return NextResponse.json(
        { message: "Error: Email is required" },
        { status: 403 }
      );
    }

    await prisma.invoice.create({
      where: { email },
      data: body,
    });

    return NextResponse.json(
      { message: "Invoice created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(req, params) {
  try {
    const {
      params: { email },
    } = params;

    if (!email) {
      return NextResponse.json(
        { message: "Error: Email is required" },
        { status: 403 }
      );
    }

    const existingUser = await prisma.invoice.findUnique({ where: { email } });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Invoice fetched successfully", data: existingUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
