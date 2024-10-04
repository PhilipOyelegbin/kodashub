// pages/api/send-email.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { recipient, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"KodasHub" <${process.env.SMTP_USER}>`,
      to: [recipient, process.env.SMTP_USER],
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
