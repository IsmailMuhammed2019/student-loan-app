"use client";

import React, { useState } from "react";
import { InputField } from "./InputField";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const courses = {
  AWS: [
    "AWS Cloud Engineering/Solutions Architect",
    "DevOps Engineering",
    "I’ll decide later",
  ],
  "Data Science": [
    "Data Analysis/Data Visualization",
    "Machine Learning/Deep Learning",
    "Natural Language Processing",
    "Model Deployment and Cloud for ML",
    "I’ll decide later",
  ],
  "FullStack Development": [
    "FrontEnd Development",
    "BackEnd Development",
    "I’ll decide later",
  ],
  "Cyber Security": [
    "CompTIA Security Plus",
    "SOC Experience",
    "I’ll decide later",
  ],
  Salesforce: [
    "Salesforce Developer",
    "Upskill - Salesforce Advanced Flow",
    "Upskill - Salesforce Internship",
    "Upskill - Salesforce CPQ",
    "I’ll decide later",
  ],
  "SDET (QA Tester)": [
    "Mobile Testing (Appium)",
    "AWS Cloud for Testers",
    "I’ll decide later",
  ],
  "Not Decided Yet": [],
};

export default function LoanForm() {
  const [course, setCourse] = useState<keyof typeof courses | "">("");
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    modeOfIdentification: "",
    identificationNumber: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    fetch("https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse", {
      method: "POST",
      mode: "no-cors",
      body: data,
    });

    setSubmitted(true);
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow rounded-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-2 text-center">Apply For ICBM Training Loan Application</h1>
        <p className="text-center text-gray-600 mb-10">
          Apply for a training loan to fund your training at IBCM and Training Institute, we connect you to your opportunities and achieve your career goals. <br />Complete the form below to get started.
        </p>

        {submitted ? (
          <div className="p-4 rounded">
            <h2 className="text-xl font-bold text-green-500">Success!</h2>
            <p className="mt-2">
              Your application has been submitted successfully. We will review your application and contact you shortly.
            </p>
            <div className="flex justify-center mt-8">
              <Button
                type="button"
                onClick={() => (window.location.href = "https://www.icbm.training/")}
                className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="mb-8">
                  <InputField
                    label="First Name"
                    name="entry.1111111111"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none"
                  />
                </div>
                <div className="mb-8">
                  <InputField
                    label="Last Name"
                    name="entry.2222222222"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none"
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700">
                    Mode of Identification<span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {["NIN", "BVN", "International Passport"].map((idType) => (
                      <div key={idType} className="flex items-center">
                        <input
                          type="radio"
                          id={idType}
                          name="modeOfIdentification"
                          value={idType}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                          required
                        />
                        <label htmlFor={idType} className="ml-2 text-sm text-gray-700">
                          {idType}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {formData.modeOfIdentification && (
                  <div className="mb-8">
                    <InputField
                      label={`Enter your ${formData.modeOfIdentification} Number`}
                      name="identificationNumber"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none"
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="flex-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      country={"ng"} // Set default country to Nigeria
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      inputClass="w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3"
                      containerClass="mt-1 w-full focus-within:ring-green-500 focus-within:border-green-500"
                      preferredCountries={["ng", "us"]} // Optional: Add Nigeria to preferred countries
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="py-2 px-6 rounded border border-green-500 text-green-500 hover:bg-transparent hover:text-green-700"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2">Course</label>
                  <select
                    name="entry.5555555555"
                    onChange={(e) => setCourse(e.target.value as keyof typeof courses)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none"
                  >
                    <option value="">Select a course</option>
                    {Object.keys(courses).map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                {course && (
                  <div className="mb-8">
                    <label className="block text-sm font-medium mb-2">Sub-Course</label>
                    {courses[course].map((subCourse) => (
                      <div key={subCourse} className="flex items-center mb-2">
                        <input
                          type="radio"
                          id={subCourse}
                          name="entry.6666666666"
                          value={subCourse}
                          required
                          className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                        />
                        <label htmlFor={subCourse} className="ml-2 text-sm text-gray-700">
                          {subCourse}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Level of Education Field */}
                <div className="mb-8">
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                    Level of Education<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="education"
                    name="education"
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none"
                  >
                    <option value="">Select your level of education</option>
                    <option value="High School">High School</option>
                    <option value="Associate Degree">Associate Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex justify-between mt-">
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white py-2 px-6 rounded"
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="border border-green-500 text-green-500 hover:bg-transparent hover:text-green-700 py-2 px-6 rounded"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2">Loan Type</label>
                  {["Full Loan", "Part Loan"].map((loanType) => (
                    <div key={loanType} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={loanType}
                        name="entry.9999999999"
                        value={loanType}
                        required
                        className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                      />
                      <label htmlFor={loanType} className="ml-2 text-sm text-gray-700">
                        {loanType}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <label htmlFor="additional" className="block text-sm font-medium">
                    Why should you be granted this loan?
                  </label>
                  <Textarea
                    id="additional"
                    name="entry.1010101010"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm pl-3"
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white py-2 px-6 rounded"
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    className="py-2 px-6 rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    Submit Application
                  </Button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}