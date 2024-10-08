import { prisma } from "@/config/db";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function PATCH(req, params) {
  try {
    const { password, ...body } = await req.json();
    const {
      params: { email },
    } = params;

    if (!email) {
      return NextResponse.json(
        { message: "Error: Email is required" },
        { status: 403 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        hosting: true,
        development: true,
        invoices: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    if (password) {
      var hashedPassword = await bcryptjs.hash(password, 12);
      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
        },
      });
    } else {
      await prisma.user.update({
        where: { email },
        data: { ...body },
      });
    }

    return NextResponse.json(
      { message: "Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
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

    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        hosting: true,
        development: true,
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
      { message: "User fetched successfully", data: existingUser },
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
      params: { email },
    } = params;

    if (!email) {
      return NextResponse.json(
        { message: "Error: Email is required" },
        { status: 403 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        hosting: true,
        development: true,
        invoices: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    // delete the data of other users relatinship conditionally
    if (prisma.invoice) {
      const invoice = await prisma.invoice.delete();
    }

    if (prisma.hosting) {
      const hosting = await prisma.hosting.delete();
    }

    if (prisma.development) {
      const development = await prisma.development.delete();
    }

    // delete the user
    const user = await prisma.user.delete({ where: { email } });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
