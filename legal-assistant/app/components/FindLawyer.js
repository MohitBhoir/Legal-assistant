"use client";

import { useState, useEffect } from "react";
import * as mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/webpack";
import Loader from "./Loader";

export default function FindLawyer() {
  const [inputType, setInputType] = useState("text");
  const [isLoading, setIsLoading] = useState(false); 
  const [input, setInput] = useState("");
  const [selectedAction, setSelectedAction] = useState("default");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseresults, setCaseResults] = useState({
    verdict: "",
    reason: "",
    corrected_df: [],
  });

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";
  }, []);

  const extractTextFromPdf = async (pdfFile) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let text = "";

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        text += pageText + " ";
      }

      return text.trim();
    } catch (error) {
      throw new Error("Failed to extract text from PDF: " + error.message);
    }
  };

  const handleFileUpload = async (file) => {
    setError(null);
    if (!file) return;

    const fileType = file.type;

    if (fileType === "application/pdf") {
      try {
        const extractedText = await extractTextFromPdf(file);
        setInput(extractedText);
      } catch (err) {
        setError("Failed to extract text from PDF: " + err.message);
      }
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setInput(result.value || "");
      } catch (err) {
        setError("Failed to extract text from Word document");
      }
    } else {
      setError("Only PDF and Word documents are supported");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    if (selectedAction === "findSimilarLawyer") {
      try {
        // setLoader(true)
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
      } catch (err) {
        setError(err.message);
      } finally{
        setIsLoading(false);
      }
    } else {
      try {
        // setLoader(true)
        const response = await fetch("/api/verdict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_input: input }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch verdict and similar cases");
        }
        
        const data = await response.json();
        setCaseResults({
          verdict: data.verdict || "",
          reason: data.reason || "",
          corrected_df: data.corrected_df || [],
        });
      } catch (err) {
        setError(err.message);
      }
      finally{
        setIsLoading(false);
      }
    }
  };

  const handleViewCase = (caseData) => {
    setSelectedCase(caseData);
  };

  const handleClosePopup = () => {
    setSelectedCase(null);
  };

  return (
    <div className="mt-[92px] p-4 flex flex-col items-center">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">
    Find Info with Case Input
  </h1>
  <div className="mb-4 sm:mb-6 flex flex-wrap justify-center items-center gap-2">
    <label className="text-white font-semibold mr-2">Input Type:</label>
    <button
      onClick={() => setInputType("text")}
      className={`px-3 py-2 text-sm sm:text-base rounded-l-md ${
        inputType === "text" ? "bg-[rgb(3,70,148)] text-white" : "bg-gray-200"
      }`}
    >
      Text Input
    </button>
    <button
      onClick={() => setInputType("file")}
      className={`px-3 py-2 text-sm sm:text-base rounded-r-md ${
        inputType === "file" ? "bg-[rgb(3,70,148)] text-white" : "bg-gray-200"
      }`}
    >
      Upload File
    </button>
  </div>
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-lg"
  >
    {inputType === "text" ? (
      <input
        type="text"
        placeholder="Enter case"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border border-gray-300 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    ) : (
      <div className="relative mb-3 sm:mb-4">
        <label className="block mb-1 sm:mb-2 text-gray-900 text-sm sm:text-base">
          Upload PDF/Word File:
        </label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="w-full border border-gray-300 p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    )}
    <div className="relative mb-3 sm:mb-4">
      <select
        onChange={(e) => setSelectedAction(e.target.value)}
        value={selectedAction}
        className="w-full border border-gray-300 p-2 sm:p-3 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="default" disabled>
          Select a service
        </option>
        <option value="findSimilarLawyer">Find Similar Lawyer</option>
        <option value="findCase">Find Similar Cases/Find Case Verdict</option>
      </select>
    </div>
    <button
      type="submit"
      className="w-full bg-[rgb(3,70,148)] text-white text-sm sm:text-base font-semibold py-2 sm:py-3 rounded-md hover:bg-[rgb(5,90,180)] transition duration-200"
    >
      Submit
    </button>
  </form>
  {isLoading && <Loader />}
  {error && <p className="text-red-600 mt-4">{error}</p>}
      {!isLoading && selectedAction == "findSimilarLawyer" && ( <ul className="my-6 w-full max-w-lg overflow-y-auto max-h-96 no-scrollbar">
          {results.map((result, index) => (
            <li
              key={index}
              className="bg-white shadow-sm rounded-lg p-4 mb-4 border-l-4 border-indigo-500"
            >
              <p className="text-gray-700">
                <strong className="text-indigo-700">Name:</strong> {result.name}
              </p>
              <p className="text-gray-700">
                <strong className="text-indigo-700">Practice Area:</strong>{" "}
                {result.practice_area}
              </p>
              <p className="text-gray-700">
                <strong className="text-indigo-700">Contact:</strong>{" "}
                {result.contact}
              </p>
              <p className="text-gray-700">
                <strong className="text-indigo-700">Email:</strong>{" "}
                {result.email}
              </p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && selectedAction === "findCase" && caseresults.verdict != "" && (
        <div className="p-6  h-auto">
          <div className="bg-white p-6 shadow-md rounded-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Verdict</h2>
            <p className="text-lg text-gray-700 mt-4">{caseresults.verdict}</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Reason</h3>
            <p className="text-lg text-gray-700 mt-2">{caseresults.reason}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseresults.corrected_df.length > 0 ? (
              caseresults.corrected_df.map((caseItem, index) => (
                <div
                  key={index}
                  className="bg-white p-4 shadow-md rounded-md flex flex-col justify-between"
                >
                  <h4 className="text-xl font-bold text-gray-800">
                    {caseItem.Title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Date: {caseItem.Date}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Verdict: {caseItem.Verdict}
                  </p>
                  <button
                    onClick={() => handleViewCase(caseItem)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    View Case
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No cases available to display.</p>
            )}
          </div>

          {selectedCase && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
                <button
                  onClick={handleClosePopup}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
                <h4 className="text-2xl font-bold text-gray-800">
                  {selectedCase.Title}
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  Date: {selectedCase.Date}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Verdict: {selectedCase.Verdict}
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  {selectedCase.Summary}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
</div>

  );
}
