import { NextResponse } from "next/server";

// POST method for finding similar offenses
export async function POST(request) {
  try {
    // Parse the JSON body
    const { input_offense, top_n } = await request.json();

    // Send the request to the FastAPI backend
    const fastApiResponse = await fetch("http://127.0.0.1:8000/api/find-similar-offenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_offense, top_n }),
    });

    if (!fastApiResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch similar offenses from backend" }, { status: 500 });
    }

    // Parse the FastAPI response
    const data = await fastApiResponse.json();

    // Return the response to the Next.js client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
