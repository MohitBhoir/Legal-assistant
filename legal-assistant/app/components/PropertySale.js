'use client';
import { useState } from 'react';

export default function PropertySale() {
  const [formData, setFormData] = useState({
    executionDate: '',
    executionMonth: '',
    executionYear: '',
    vendorName: '',
    vendorFatherName: '',
    vendorAddress: '',
    purchaserName: '',
    purchaserFatherName: '',
    purchaserAddress: '',
    totalPrice: '',
    totalPriceWords: '',
    earnestMoney: '',
    earnestMoneyWords: '',
    performanceMonths: '',
    balancePrice: '',
    balancePriceWords: '',
    titleDeedsDays: '',
    titleApprovalDays: '',
    refundDays: '',
    interestRate: '',
    houseNumber: '',
    propertyLocation: '',
    northBoundary: '',
    southBoundary: '',
    eastBoundary: '',
    westBoundary: '',
    witness1Name: '',
    witness1FatherName: '',
    witness1Address: '',
    witness2Name: '',
    witness2FatherName: '',
    witness2Address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/generate-pdf/sale-agreement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Sale_Agreement.docx';
      link.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Error generating the sale agreement document.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md space-y-6">
      <h1 className="text-2xl font-semibold text-center">Agreement of Sale Form</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">General Information</h2>
        <input
          type="number"
          name="executionDate"
          placeholder="Execution Day"
          value={formData.executionDate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="executionMonth"
          placeholder="Execution Month"
          value={formData.executionMonth}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="executionYear"
          placeholder="Execution Year"
          value={formData.executionYear}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Vendor Details</h2>
        <input
          type="text"
          name="vendorName"
          placeholder="Vendor Name"
          value={formData.vendorName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="vendorFatherName"
          placeholder="Vendor's Father's Name"
          value={formData.vendorFatherName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="vendorAddress"
          placeholder="Vendor Address"
          value={formData.vendorAddress}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Purchaser Details</h2>
        <input
          type="text"
          name="purchaserName"
          placeholder="Purchaser Name"
          value={formData.purchaserName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="purchaserFatherName"
          placeholder="Purchaser's Father's Name"
          value={formData.purchaserFatherName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="purchaserAddress"
          placeholder="Purchaser Address"
          value={formData.purchaserAddress}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Property Details</h2>
        <input
          type="text"
          name="houseNumber"
          placeholder="House Number"
          value={formData.houseNumber}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="propertyLocation"
          placeholder="Property Location"
          value={formData.propertyLocation}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="northBoundary"
          placeholder="North Boundary"
          value={formData.northBoundary}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          
        />
        <input
          type="text"
          name="southBoundary"
          placeholder="South Boundary"
          value={formData.southBoundary}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          
        />
        <input
          type="text"
          name="eastBoundary"
          placeholder="East Boundary"
          value={formData.eastBoundary}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        
        />
        <input
          type="text"
          name="westBoundary"
          placeholder="West Boundary"
          value={formData.westBoundary}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Financial Details</h2>
        <input
          type="number"
          name="totalPrice"
          placeholder="Total Price"
          value={formData.totalPrice}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="totalPriceWords"
          placeholder="Total Price (in words)"
          value={formData.totalPriceWords}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="earnestMoney"
          placeholder="Earnest Money"
          value={formData.earnestMoney}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="earnestMoneyWords"
          placeholder="Earnest Money (in words)"
          value={formData.earnestMoneyWords}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="balancePrice"
          placeholder="Balance Price"
          value={formData.balancePrice}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="balancePriceWords"
          placeholder="Balance Price (in words)"
          value={formData.balancePriceWords}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="performanceMonths"
          placeholder="Performance Months"
          value={formData.performanceMonths}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="titleDeedsDays"
          placeholder="Days to Submit Title Deeds"
          value={formData.titleDeedsDays}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="titleApprovalDays"
          placeholder="Days to Approve Title"
          value={formData.titleApprovalDays}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="refundDays"
          placeholder="Refund Days"
          value={formData.refundDays}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="interestRate"
          placeholder="Interest Rate (%)"
          value={formData.interestRate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Witness Details</h2>
        <input
          type="text"
          name="witness1Name"
          placeholder="Witness 1 Name"
          value={formData.witness1Name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="witness1FatherName"
          placeholder="Witness 1 Father's Name"
          value={formData.witness1FatherName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="witness1Address"
          placeholder="Witness 1 Address"
          value={formData.witness1Address}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="witness2Name"
          placeholder="Witness 2 Name"
          value={formData.witness2Name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="witness2FatherName"
          placeholder="Witness 2 Father's Name"
          value={formData.witness2FatherName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="witness2Address"
          placeholder="Witness 2 Address"
          value={formData.witness2Address}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <button type="submit" className="w-full p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
        Generate Sale Agreement
      </button>
    </form>
  );
}
