import { NextResponse } from "next/server";

const { prisma } = require("@/config/db");

export async function GET() {
  const response = await prisma.category.findMany();
  return NextResponse.json(
    { message: "User fetched successfully", data: result },
    { status: 200 }
  );
}
