import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

// post an hosting for a user to the email provided
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
        hosting: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Error: User not found" },
        { status: 404 }
      );
    }

    await prisma.hosting.create({
      data: {
        ...body,
        user: {
          connect: { id: existingUser.id },
        },
      },
    });

    return NextResponse.json(
      { message: "Hosting created successfully" },
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
  // get all hosting for the user with the email provided
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
          hosting: true,
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
          message: "Hosting fetched successfully",
          data: existingUser?.hosting,
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
    // get an hosting by id
    const id = slug;
    try {
      if (!id) {
        return NextResponse.json(
          { message: "Error: ID is required" },
          { status: 403 }
        );
      }

      const existingHosting = await prisma.hosting.findUnique({
        where: { id },
      });

      if (!existingHosting) {
        return NextResponse.json(
          { message: "Hosting does not exist" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Hosting fetched successfully", data: existingHosting },
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

// delete an hosting by id
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

    const existingHosting = await prisma.hosting.findUnique({ where: { id } });

    if (!existingHosting) {
      return NextResponse.json(
        { message: "Hosting does not exist" },
        { status: 404 }
      );
    }

    await prisma.hosting.delete({ where: { id } });

    return NextResponse.json(
      { message: "Hosting deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
