"use client";

import { useState } from "react";

export default function Home() {
  const [inputOffense, setInputOffense] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/ipc_check/IPCoffense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_offense: inputOffense,
          top_n: 20,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch similar offenses");
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen  p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-black mb-6">
        Find Similar Offenses
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        <textarea
          type="text"
          placeholder="Enter offense"
          value={inputOffense}
          onChange={(e) => setInputOffense(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      <ul className="mt-6 w-full max-w-lg overflow-y-auto max-h-96 no-scrollbar">
        {results.map((result, index) => (
          <li
            key={index}
            className="bg-white shadow-sm rounded-lg p-4 mb-4 border-l-4 border-blue-500"
          >
            <p className="text-gray-700">
              <strong className="text-blue-700">Offense:</strong>{" "}
              {result.Offense}
            </p>
            <p className="text-gray-700">
              <strong className="text-blue-700">Punishment:</strong>{" "}
              {result.Punishment}
            </p>
            <p className="text-gray-700">
              <strong className="text-blue-700">Section:</strong>{" "}
              {result.Section}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
