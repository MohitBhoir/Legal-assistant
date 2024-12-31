'use client';
import { useState } from 'react';

export default function NameChangeForm() {
  const [formData, setFormData] = useState({
    newName: '',
    parentName: '',
    oldName: '',
    profession: '',
    permanentAddress: '',
    currentAddress: '',
    passportNumber: '',
    issuingPlace: '',
    issuingDate: '',
    witnesses: [
      { name: '', address: '' },
      { name: '', address: '' },
    ],
    day: '',
    month: '',
    year: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWitnessChange = (index, field, value) => {
    const updatedWitnesses = [...formData.witnesses];
    updatedWitnesses[index][field] = value;
    setFormData({ ...formData, witnesses: updatedWitnesses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const response = await fetch('/api/generate-pdf/affidavit-namechange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Change_of_Name_Affidavit.docx';
      link.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Error generating the affidavit document.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md space-y-6">
      <h1 className="text-2xl font-semibold text-center text-[rgb(3,70,148)]">Affidavit for Change of Name</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="newName"
          placeholder="New Name"
          value={formData.newName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="parentName"
          placeholder="Parent's Name"
          value={formData.parentName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="oldName"
          placeholder="Old Name"
          value={formData.oldName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="profession"
          placeholder="Profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="permanentAddress"
          placeholder="Permanent Address"
          value={formData.permanentAddress}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="currentAddress"
          placeholder="Current Address"
          value={formData.currentAddress}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="passportNumber"
          placeholder="Passport Number"
          value={formData.passportNumber}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          
        />
        <input
          type="text"
          name="issuingPlace"
          placeholder="Passport Issuing Place"
          value={formData.issuingPlace}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          
        />
        <input
          type="date"
          name="issuingDate"
          placeholder="Passport Issuing Date"
          value={formData.issuingDate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Witness Information</h2>
        {formData.witnesses.map((witness, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              placeholder={`Witness ${index + 1} Name`}
              value={witness.name}
              onChange={(e) => handleWitnessChange(index, 'name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <textarea
              placeholder={`Witness ${index + 1} Address`}
              value={witness.address}
              onChange={(e) => handleWitnessChange(index, 'address', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Declaration Date</h2>
        <input
          type="number"
          name="day"
          placeholder="Day"
          value={formData.day}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="month"
          placeholder="Month"
          value={formData.month}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <button type="submit" className="w-full p-4 bg-[rgb(3,70,148)] text-white
          hover:bg-[rgb(5,90,180)] transition duration-200 font-semibold rounded-md ">
        Generate Affidavit
      </button>
    </form>
  );
}
