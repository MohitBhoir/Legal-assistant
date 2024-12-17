'use client'
import { useState } from "react";

export default function LeaseNewForm() {
  const [formData, setFormData] = useState({
    lessorName: "",
    lessorFatherName: "",
    lessorAge: "",
    lessorAddress: "",
    lesseeName: "",
    lesseeFatherName: "",
    lesseeAge: "",
    lesseeAddress: "",
    propertyAddress: "",
    propertyArea: "",
    rentAmount: "",
    securityDeposit: "",
    leaseStartDate: "",
    leaseEndDate: "",
    paymentDueDate: "",
    lateFee: "",
    terminationNoticePeriod: "",
    jurisdiction: "",
    governingLaw: "",
    registrationLocation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    const response = await fetch("/api/generate-pdf/lease", {  // Make sure the API endpoint is updated for Word document
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    // Check if the response is successful
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create a link to download the Word document
      const link = document.createElement("a");
      link.href = url;
      link.download = "Commercial_Lease_Agreement.docx";  // Set the file extension to .docx
      link.click();
      
      // Clean up the URL object after download
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Error generating the Word document.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md space-y-6">
      <h1 className="text-2xl font-semibold text-center">Commercial Lease Agreement Form</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Lessor Information</h2>
        <input
          type="text"
          name="lessorName"
          placeholder="Lessor's Name"
          value={formData.lessorName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="lessorFatherName"
          placeholder="Lessor's Father's Name"
          value={formData.lessorFatherName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="lessorAge"
          placeholder="Lessor's Age"
          value={formData.lessorAge}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="lessorAddress"
          placeholder="Lessor's Address"
          value={formData.lessorAddress}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Lessee Information</h2>
        <input
          type="text"
          name="lesseeName"
          placeholder="Lessee's Name"
          value={formData.lesseeName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="lesseeFatherName"
          placeholder="Lessee's Father's Name"
          value={formData.lesseeFatherName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="lesseeAge"
          placeholder="Lessee's Age"
          value={formData.lesseeAge}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="lesseeAddress"
          placeholder="Lessee's Address"
          value={formData.lesseeAddress}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Property Information</h2>
        <textarea
          name="propertyAddress"
          placeholder="Property Address"
          value={formData.propertyAddress}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="propertyArea"
          placeholder="Property Area (e.g., 200 sq. meters)"
          value={formData.propertyArea}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Lease Details</h2>
        <input
          type="number"
          name="rentAmount"
          placeholder="Monthly Rent Amount (₹)"
          value={formData.rentAmount}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="securityDeposit"
          placeholder="Security Deposit (₹)"
          value={formData.securityDeposit}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="date"
          name="leaseStartDate"
          placeholder="Lease Start Date"
          value={formData.leaseStartDate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="date"
          name="leaseEndDate"
          placeholder="Lease End Date"
          value={formData.leaseEndDate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="paymentDueDate"
          placeholder="Payment Due Date (e.g., 5 for 5th of each month)"
          value={formData.paymentDueDate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="lateFee"
          placeholder="Late Fee Amount (₹)"
          value={formData.lateFee}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Other Details</h2>
        <input
          type="number"
          name="terminationNoticePeriod"
          placeholder="Termination Notice Period (days)"
          value={formData.terminationNoticePeriod}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="jurisdiction"
          placeholder="Jurisdiction"
          value={formData.jurisdiction}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          
        />
        <input
          type="text"
          name="governingLaw"
          placeholder="Governing Law"
          value={formData.governingLaw}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          
        />
        <input
          type="text"
          name="registrationLocation"
          placeholder="Registration Location"
          value={formData.registrationLocation}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          
        />
      </div>

      <button type="submit" className="w-full p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
        Generate PDF
      </button>
    </form>
  );
}
