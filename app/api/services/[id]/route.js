import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function PATCH(req, params) {
  try {
    const data = await req.json();
    const {
      params: { id },
    } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Error: ID is required" },
        { status: 400 }
      );
    }

    const existingService = await prisma.offerings.findUnique({
      where: { id },
    });

    if (!existingService) {
      return NextResponse.json(
        { message: "Service does not exist" },
        { status: 404 }
      );
    }

    const newData = await prisma.offerings.update({
      where: { id },
      data: { ...data },
    });

    return NextResponse.json(
      { message: "Updated successfully", newData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

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

    const existingService = await prisma.offerings.findUnique({
      where: { id },
    });

    if (!existingService) {
      return NextResponse.json(
        { message: "Service does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Service fetched successfully", data: existingService },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
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

    const existingService = await prisma.offerings.delete({ where: { id } });

    if (!existingService) {
      return NextResponse.json(
        { message: "Service does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
