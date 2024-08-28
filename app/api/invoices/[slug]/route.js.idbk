import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  try {
    const {
      params: { id },
    } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Error: ID is required" },
        { status: 403 }
      );
    }

    const existingInvoice = await prisma.invoice.findUnique({ where: { id } });

    if (!existingInvoice) {
      return NextResponse.json(
        { message: "Invoice does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Invoice fetched successfully", data: existingInvoice },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, params) {
  try {
    const {
      params: { id },
    } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Error: ID is required" },
        { status: 403 }
      );
    }

    const existingInvoice = await prisma.invoice.findUnique({ where: { id } });

    if (!existingInvoice) {
      return NextResponse.json(
        { message: "Invoice does not exist" },
        { status: 404 }
      );
    }

    await prisma.invoice.delete({ where: { id } });

    return NextResponse.json(
      { message: "Invoice deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
