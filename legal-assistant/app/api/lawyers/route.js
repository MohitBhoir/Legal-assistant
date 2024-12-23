import { connectToDB } from "@/utils/mongodb";
import Lawyer from "@/models/lawyer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the JSON body
    const { query } = await request.json();

    // Send the query to the FastAPI backend
    const fastApiResponse = await fetch("http://127.0.0.1:8000/api/lawyer-type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!fastApiResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch lawyer type from FastAPI" }, { status: 500 });
    }

    // Parse the response from FastAPI
    const { lawyer_type } = await fastApiResponse.json();

    if (!lawyer_type) {
      return NextResponse.json(
        { error: "Invalid response from FastAPI: missing lawyer_type" },
        { status: 500 }
      );
    }

    // Ensure MongoDB connection
    await connectToDB();

    // Query the database for lawyers matching the type
    const lawyers = await Lawyer.find({ practice_area: lawyer_type.toLowerCase() });

    // Log the lawyers variable to the console
    console.log("Queried Lawyers:", lawyers);

    // Return the lawyer data to the frontend
    return NextResponse.json({ lawyers }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
