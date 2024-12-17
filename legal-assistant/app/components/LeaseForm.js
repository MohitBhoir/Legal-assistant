'use client'
import React, { useState } from "react";
import { jsPDF } from "jspdf";

const LeaseForm = () => {
  const [formData, setFormData] = useState({
    leaseDate: "",
    effectiveDate: "",
    lessorName: "",
    lessorSignatory: "",
    lesseeName: "",
    lesseeSignatory: "",
    premisesAddress: "",
    rentAmount: "",
    securityDeposit: "",
    leaseDuration: "",
    additionalDetails: "",
  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = 20;
    const contentWidth = pageWidth - marginLeft * 2;

    const title = "Lease Agreement";
    const sectionSpacing = 10;

    // Adding Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(title, pageWidth / 2, 20, { align: "center" });

    // Adding Agreement Details
    let currentY = 40;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const leaseDetails = [
      `Lease Date:${formData.leaseDate}`,
      `Effective Date:${formData.effectiveDate}`,
      `Lessor's Name:${formData.lessorName}`,
      `Lessor's Authorized Signatory:${formData.lessorSignatory}`,
      `Lessee's Name:${formData.lesseeName}`,
      `Lessee's Authorized Signatory:${formData.lesseeSignatory}`,
      `Premises Address:${formData.premisesAddress}`,
      `Rent Amount:Rs. ${formData.rentAmount}`,
      `Security Deposit:Rs. ${formData.securityDeposit}`,
      `Lease Duration:${formData.leaseDuration} years`,
    ];

    leaseDetails.forEach((detail) => {
      let splittedText = detail.split(":");
      doc.setFont("helvetica", "bold");
      doc.text(splittedText[0] + ":", marginLeft, currentY);
      doc.setFont("helvetica", "normal");
      const text = doc.splitTextToSize(splittedText[1], contentWidth - splittedText[0].length);
      doc.text(text, marginLeft + splittedText[0].length * 2 + 8, currentY);
      currentY += sectionSpacing * text.length;
    });

    // Terms and Conditions Section
    currentY += sectionSpacing;
    doc.setFont("helvetica", "bold");
    doc.text("Terms and Conditions:", marginLeft, currentY);
    currentY += sectionSpacing;

    doc.setFont("helvetica", "normal");
    const termsAndConditions = [
      "1. The tenant agrees to pay the rent by the due date every month.",
      "2. The landlord agrees to provide a habitable premise.",
      "3. The security deposit will be refunded at the end of the lease term after deductions for any damages.",
      "4. Any modifications to the property must be approved by the landlord.",
      "5. Both parties must provide 30 days' notice before terminating the lease.",
    ];

    termsAndConditions.forEach((term) => {
      const wrappedTerm = doc.splitTextToSize(term, contentWidth);
      doc.text(wrappedTerm, marginLeft, currentY);
      currentY += sectionSpacing * wrappedTerm.length;
    });

    // Additional Terms Section
    if (formData.additionalDetails.trim()) {
      currentY += sectionSpacing;
      doc.setFont("helvetica", "bold");
      doc.text("Additional Terms and Details:", marginLeft, currentY);
      currentY += sectionSpacing;

      doc.setFont("helvetica", "normal");
      const additionalTerms = doc.splitTextToSize(formData.additionalDetails, contentWidth);
      additionalTerms.forEach((line) => {
        doc.text(line, marginLeft, currentY);
        currentY += sectionSpacing;
      });
    }

    // Footer: Signatures
    currentY += sectionSpacing;
    doc.setFont("helvetica", "bold");
    doc.text("Signatures:", marginLeft, currentY);
    currentY += sectionSpacing;
    doc.text(`Lessor: _______________________`, marginLeft, currentY);
    doc.text(`Lessee: _______________________`, marginLeft * 5, currentY);

    return doc;
  };

  const previewPDF = () => {
    const doc = generatePDF();
    const pdfBlob = doc.output("blob");
    const pdfURL = URL.createObjectURL(pdfBlob);
    window.open(pdfURL, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-6">Lease Deed Form</h1>
      <form className="grid gap-4">
        {[
          { name: "leaseDate", type: "date", placeholder: "Lease Date" },
          { name: "effectiveDate", type: "date", placeholder: "Effective Date" },
          { name: "lessorName", type: "text", placeholder: "Lessor's Name" },
          { name: "lessorSignatory", type: "text", placeholder: "Lessor's Authorized Signatory" },
          { name: "lesseeName", type: "text", placeholder: "Lessee's Name" },
          { name: "lesseeSignatory", type: "text", placeholder: "Lessee's Authorized Signatory" },
          { name: "premisesAddress", type: "text", placeholder: "Premises Address" },
          { name: "rentAmount", type: "number", placeholder: "Rent Amount" },
          { name: "securityDeposit", type: "number", placeholder: "Security Deposit" },
          { name: "leaseDuration", type: "text", placeholder: "Lease Duration (in years)" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        ))}

        <textarea
          name="additionalDetails"
          placeholder="Additional Terms and Details"
          onChange={handleChange}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
        ></textarea>

        <button
          type="button"
          onClick={previewPDF}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Preview Lease Deed PDF
        </button>
      </form>
    </div>
  );
};

export default LeaseForm;
