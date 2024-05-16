import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const data = await prisma.course.findMany();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Error"})
    }
}

export async function DELETE(req, res) {
    try {
        const data = {
            title: "Frontend: ReactJs",
            description: "Frontend development using ReactJS involves building user interfaces and user experiences for web applications using the React library. React allows developers to create reusable UI components, manage state and props, and handle events and updates efficiently. With React, developers can create fast, scalable, and maintainable frontend applications. React enables developers to create dynamic, interactive, and responsive web applications with a high level of customization and control. Its popularity and large community make it a go-to choice for frontend development.",
            cover_image: "",
            price: "₦100,000",
            prerequisite: "Knowledge of HTML, CSS and JavaScript.",
        };
        const result = await prisma.course.create({data: data})
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.error(500).json({ error: "Error"})
    }s
}

export async function PUT(req, res) {
    try {
        const data = {
            title: "Frontend: ReactJs",
            description: "Frontend development using ReactJS involves building user interfaces and user experiences for web applications using the React library. React allows developers to create reusable UI components, manage state and props, and handle events and updates efficiently. With React, developers can create fast, scalable, and maintainable frontend applications. React enables developers to create dynamic, interactive, and responsive web applications with a high level of customization and control. Its popularity and large community make it a go-to choice for frontend development.",
            cover_image: "",
            price: "₦100,000",
            prerequisite: "Knowledge of HTML, CSS and JavaScript.",
        };
        const result = await prisma.course.create({data: data})
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.error(500).json({ error: "Error"})
    }s
}