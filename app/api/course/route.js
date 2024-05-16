import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await prisma.course.findMany();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(error?.meta?.details)
    }
}

export async function POST() {
    try {
        const data = {
            title: "Frontend: HTML, CSS & JS",
            description: "Frontend development using HTML, CSS, and JavaScript involves building the user interface and user experience of web applications using these fundamental technologies. HTML (Hypertext Markup Language) is used for structuring and organizing content on the web page. CSS (Cascading Style Sheets) is used for styling, layout, and visual effects, making the web page visually appealing. JavaScript is used for adding interactivity, dynamic effects, and functionality to the web page, making it responsive and engaging. Together, these technologies enable developers to create static and dynamic web pages, web applications, and mobile applications, forming the backbone of frontend development. Mastering HTML, CSS, and JavaScript is essential for building modern web applications and providing a solid foundation for frontend development.",
            cover_image: "",
            price: "₦70,000",
            prerequisite: "Knowledge of basic computer usage.",
        };
        const result = await prisma.course.create({data: data})
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.error(500).json({ error: "Error"})
    }s
}