import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");
    console.log("token", token);
    if (!token?.value) {
        return NextResponse.redirect("/auth/login");
    }

    return req;
}