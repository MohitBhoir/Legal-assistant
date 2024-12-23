"use client";

import { useState } from "react";

export default function FindLawyer() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/lawyers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch lawyer details");
      }

      const data = await response.json();
      setResults(data.lawyers || []);
    //   console.log(results)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen mt-[92px] p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6">
        Find Lawyer by Case
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        <input
          type="text"
          placeholder="Enter case"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
          Find
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      <ul className="mt-6 w-full max-w-lg overflow-y-auto max-h-96">
        {results.map((result, index) => (
          <li
            key={index}
            className="bg-white shadow-sm rounded-lg p-4 mb-4 border-l-4 border-blue-500"
          >
            <p className="text-gray-700">
              <strong className="text-blue-700">Name:</strong> {result.name}
            </p>
            <p className="text-gray-700">
              <strong className="text-blue-700">Practice Area:</strong>{" "}
              {result.practice_area}
            </p>
            <p className="text-gray-700">
              <strong className="text-blue-700">Contact:</strong>{" "}
              {result.contact}
            </p>
            <p className="text-gray-700">
              <strong className="text-blue-700">Email:</strong> {result.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
