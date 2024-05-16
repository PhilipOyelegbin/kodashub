import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const data = await prisma.user.findMany();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error })
    }
}

export async function POST(req, res) {
    try {
        const data = {
            full_name: req.addUser.full_name,
            email: req.addUser.email,
            phone_number: req.addUser.phone_number,
            password: req.addUser.password
        };
        const result = await prisma.user.create(data)
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error"})
    }
}

export async function DELETE(req, res) {
    try {
        const data = await prisma.user.delete();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Error"})
    }
}