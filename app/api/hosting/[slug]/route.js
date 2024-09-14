import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

// post an invoice for a user to the email provided
export async function POST(req, params) {
  try {
    const body = await req.json();
    const {
      params: { slug },
    } = params;
    const email = slug;

    if (!email) {
      return NextResponse.json(
        { message: "Error: Email is required" },
        { status: 403 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        invoices: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Error: User not found" },
        { status: 404 }
      );
    }

    await prisma.invoice.create({
      data: {
        ...body,
        user: {
          connect: { id: existingUser.id },
        },
      },
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
  const {
    params: { slug },
  } = params;
  // get all invoice for the user with the email provided
  if (slug.includes("@")) {
    const email = slug;
    try {
      if (!email) {
        return NextResponse.json(
          { message: "Error: Email is required" },
          { status: 403 }
        );
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
        include: {
          invoices: true,
        },
      });

      if (!existingUser) {
        return NextResponse.json(
          { message: "User does not exist" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: "Invoice fetched successfully",
          data: existingUser?.invoices,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    // get an invoice by id
    const id = slug;
    try {
      if (!id) {
        return NextResponse.json(
          { message: "Error: ID is required" },
          { status: 403 }
        );
      }

      const existingInvoice = await prisma.invoice.findUnique({
        where: { id },
      });

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
}

// delete an invoice by id
export async function DELETE(req, params) {
  try {
    const {
      params: { slug },
    } = params;
    const id = slug;

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
