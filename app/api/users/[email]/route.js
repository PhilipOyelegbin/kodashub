import { prisma } from "@/config/db";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(req, params) {
  try {
    const { password, ...data } = await req.json();
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
        profile: true,
        domains: true,
        services: true,
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
        data: {
          ...data,
          profile: {
            update: { ...data.profile },
          },
        },
      });
    }

    return NextResponse.json(
      { message: "Updated successfully" },
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

    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        domains: true,
        services: true,
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
        profile: true,
        domains: true,
        services: true,
        invoices: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    // delete the data of the user profile
    const profile = await prisma.profile.delete({
      where: { id: existingUser.profile.id },
    });

    // delete the data of other users relatinship conditionally
    if (prisma.invoice) {
      const invoice = await prisma.invoice.deleteMany();
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
