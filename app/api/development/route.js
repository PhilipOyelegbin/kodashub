import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.development.findMany();
    return NextResponse.json(
      { message: "Development services fetched successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
