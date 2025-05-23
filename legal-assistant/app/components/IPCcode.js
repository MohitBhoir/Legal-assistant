"use client";

import { useState } from "react";

export default function IPCCheck() {
  const [matchString, setMatchString] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/ipc_check/IPCcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ match_string: matchString }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch IPC details");
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen  p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[rgb(3,70,148)] text-center mb-6">
        Search IPC Details by Section Code
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        <input
          type="text"
          placeholder="Enter Section Code"
          value={matchString}
          onChange={(e) => setMatchString(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-[rgb(3,70,148)] text-white
          hover:bg-[rgb(5,90,180)] transition duration-200 py-2 rounded-md h"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      <ul className="mt-6 w-full max-w-lg overflow-y-auto max-h-96">
        {results.map((result, index) => (
          <li
            key={index}
            className="bg-white shadow-sm rounded-lg p-4 mb-4 border-l-4 border-blue-500"
          > <p className="text-gray-700">
              <strong className="text-[rgb(3,70,148)]">Description:</strong>{" "}
              {result.Description}
            </p>
            <p className="text-gray-700">
              <strong className="text-[rgb(3,70,148)]">Section:</strong>{" "}
              {result.Section}
            </p>
            <p className="text-gray-700">
              <strong className="text-[rgb(3,70,148)]">Offense:</strong>{" "}
              {result.Offense}
            </p>
            <p className="text-gray-700">
              <strong className="text-[rgb(3,70,148)]">Punishment:</strong>{" "}
              {result.Punishment}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
