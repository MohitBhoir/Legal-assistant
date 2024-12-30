import { NextResponse } from "next/server";

// POST method for fetching IPC details
export async function POST(request) {
    try {
        const { user_input } = await request.json(); // Expect the request JSON to include user_input

        const fastApiResponse = await fetch("http://127.0.0.1:9000/process_case", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_input }), // Send user_input as required by FastAPI
        });

        if (!fastApiResponse.ok) {
            return NextResponse.json(
                { error: "Failed to fetch verdict and similar cases from backend" },
                { status: 500 }
            );
        }

        const data = await fastApiResponse.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
