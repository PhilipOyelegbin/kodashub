import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

// post a development service for a user to the email provided
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
        development: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Error: User not found" },
        { status: 404 }
      );
    }

    await prisma.development.create({
      data: {
        ...body,
        user: {
          connect: { id: existingUser.id },
        },
      },
    });

    return NextResponse.json(
      { message: "Development service created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

// update a development service for the id provided
export async function PATCH(req, params) {
  try {
    const { status, ...body } = await req.json();
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

    await prisma.development.update({
      where: { id },
      data: { status: JSON.parse(status), ...body },
    });

    return NextResponse.json(
      { message: "Development service updated successfully" },
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
  // get all development service for the user with the email provided
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
          development: true,
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
          message: "Development service fetched successfully",
          data: existingUser?.development,
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
    // get an development service by id
    const id = slug;
    try {
      if (!id) {
        return NextResponse.json(
          { message: "Error: ID is required" },
          { status: 403 }
        );
      }

      const existingDevelopment = await prisma.development.findUnique({
        where: { id },
      });

      if (!existingDevelopment) {
        return NextResponse.json(
          { message: "Development service does not exist" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: "Development service fetched successfully",
          data: existingDevelopment,
        },
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

// delete an development service by id
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

    const existingDevelopment = await prisma.development.findUnique({
      where: { id },
    });

    if (!existingDevelopment) {
      return NextResponse.json(
        { message: "Development service does not exist" },
        { status: 404 }
      );
    }

    await prisma.development.delete({ where: { id } });

    return NextResponse.json(
      { message: "Development service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
