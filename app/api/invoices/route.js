import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.invoice.findMany();
    return NextResponse.json(
      { message: "Invoice fetched successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
