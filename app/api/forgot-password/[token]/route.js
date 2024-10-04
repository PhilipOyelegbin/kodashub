import { prisma } from "@/config/db";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { password } = await req.json();
    const { token } = params;

    const existingUser = await prisma.user.findFirst({
      where: {
        reset_token: token,
        reset_expiration: { gt: Date.now().toString() },
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "Invalid token!" }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    // save new password
    await prisma.user.update({
      where: { email: existingUser.email },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_expiration: null,
      },
    });

    return NextResponse.json(
      { message: "Password reset successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
