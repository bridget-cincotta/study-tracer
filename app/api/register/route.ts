import { NextRequest, NextResponse } from "next/server";

const API_URL = `${process.env.API_URL}/api/v1/auth/register`;


export async function POST(req: NextRequest){
    try {
        const body = await req.json();

        if (!body.name || !body.email || !body.username || !body.password) {
            return NextResponse.json({
                message: "Name, email, username and password are required",
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

        if (response.status !== 201) {
            return NextResponse.json({
                message: data.message,
                data: null,
                error: null
            }, {status: response.status})
        }

        // Add cookie to the response
        headers.append("Set-Cookie", `token=${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`); // 7 days

        return NextResponse.json({
            message: "Registration successful",
            data: data,
            error: null
        }, {status: 201, headers: headers})
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Internal server error",
            data: null,
            error: error
        }, {status: 500})
    }
}