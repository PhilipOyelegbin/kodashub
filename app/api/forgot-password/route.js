import { prisma } from "@/config/db";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function PATCH(req) {
  try {
    const { email } = await req.json();

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!existingUser) {
      return NextResponse.json(
        { message: "Email not found!" },
        { status: 404 }
      );
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour

    // save reset token
    await prisma.user.update({
      where: { email },
      data: {
        reset_token: resetToken,
        reset_expiration: resetTokenExpiration.toString(),
      },
    });

    // send reset token to the user
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"KodasHub" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Password Reset Request`,
      text: `
      Hi,

      You requested a password reset. Please click the following link to reset your password: ${process.env.HOST_URI}/passwordreset/updatepassword?token=${resetToken}

      It will expire within an hour. If you did not request this, please ignore this email.

      Warm regards,

      KodasHub Support
      `, // Plain text body
      html: `
      <p>Hi</p>

      <p>You requested a password reset. Please click the following link to reset your password: <a href="${process.env.HOST_URI}/passwordreset/updatepassword?token=${resetToken}">Reset password</a></p>

      <p>It will expire within an hour. If you did not request this, please ignore this email.</p>

      <p>Warm regards,</p>

      <p><br>KodasHub Support</p>
      `, // HTML body,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Reset token generated and sent successfully.", resetToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
