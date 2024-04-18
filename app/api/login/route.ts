import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_URL = `${process.env.API_URL}/api/v1/auth/login`;

export async function POST(req: NextRequest){
    try {
        const body = await req.json();

        if (!body.email || !body.password) {
            return NextResponse.json({
                message: "Email and password are required",
                data: null,
                error: null
            }, {status: 400})
        }

        const headers = new Headers();
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log("data", data);

        if (response.status !== 200) {
            return NextResponse.json({
                message: data.message,
                data: null,
                error: null
            }, {status: response.status})
        }

        // Add cookie to the response
        headers.append("Set-Cookie", `token=${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`); // 7 days

        return NextResponse.json({
            message: "Login successful",
            data: data,
            error: null
        }, {status: 200, headers: headers})
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Internal server error",
            data: null,
            error: error
        }, {status: 500})
    }
}


export async function DELETE(request: NextRequest) {
    const role = request.cookies.get("role");

    console.log("Deleting token...", request.cookies.getAll())
    const headers = new Headers();
    headers.set("Set-Cookie", `token=; path=/; HttpOnly; SameSite=Strict; expires=${new Date(Date.now() - 1000 * 60 * 60 * 24)}`);

    return NextResponse.json({
        code: 200,
        message: "Token successfully deleted",
    }, { status: 200, headers })
}