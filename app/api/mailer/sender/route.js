import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function POST(req) {
  try {
    const { subject, full_name, email, message } = await req.json();

    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.SMTP_USER,
      subject: `${subject}: ${full_name || email}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
