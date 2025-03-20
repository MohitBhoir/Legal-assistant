"use client";
import React from 'react';
import Link from 'next/link';
import {useSession} from 'next-auth/react'

export default function RegTemplate() {
  const { data: session } = useSession()
  console.log(session?.user);
  

  if (!session || !session?.user) {
    // Handle loading state
    return null;
  }

  const handleDownload = async (templateName) => {
    
    const response = await fetch(`/api/generate-pdf/${templateName}`);
  
    // Check if the response is successful
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `${link}_template.docx`;  // Set the file extension to .docx
      link.click();
      
      // Clean up the URL object after download
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Error generating the Word document.");
    }
  };

  const features = [
    {
      image: '/images/lease.png',
      heading: 'Lease',
      description: 'Generate professional lease documents quickly and effortlessly.',
      buttonText: 'Get Started',
      link: 'lease',
      emptyDownloadButtonText: "Download Preview",
      downloadLinkText: "lease"
    },
    {
      image: '/images/name.png',
      heading: 'Name Change',
      description: 'Create customized name change forms with ease.',
      buttonText: 'Get Started',
      link: 'name-change',
      emptyDownloadButtonText: "Download Preview",
      downloadLinkText: "affidavit-namechange"
    },
    {
      image: '/images/property.png',
      heading: 'Property',
      description: 'Manage all property-related documentations in one place.',
      buttonText: 'Get Started',
      link: 'property',
      emptyDownloadButtonText: "Download Preview",
      downloadLinkText: "sale-aggreement"
    },
  ];

  return (
    <section
      className="w-full h-flex flex-col justify-center bg-cover bg-center bg-gradient-to-r from-indigo-400 to-cyan-400"
    >
      <div className="py-4 px-6 mx-auto max-w-screen-lg text-center lg:py-14">
        <h1 className="mb-8 text-2xl font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">
          Document Templates
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white text-[rgb(3,70,148)] bg-opacity-80 shadow-md rounded-lg p-6 backdrop-blur-md hover:scale-105 transition-transform"
            >
              <img
                src={feature.image}
                alt={feature.heading}
                className="mb-5 w-full h-32 object-contain rounded-lg"
              />
              <h3 className="text-lg font-semibold">{feature.heading}</h3>
              <p className="text-sm text-gray-700 text-center my-3">{feature.description}</p>
              <div className='flex gap-4 justify-center items-center'>
                <button
                  className="bg-[rgb(3,70,148)] text-white inline-flex justify-center items-center py-2 px-5 mt-4 text-base font-medium hover:bg-[rgb(5,90,180)] transition duration-200 rounded-lg"
                  onClick={e => handleDownload(feature.downloadLinkText)}
                >
                  {feature.emptyDownloadButtonText}
                </button>
                <Link href={`/templates/${feature.link}`}>
                  <button
                    className="bg-[rgb(3,70,148)] text-white inline-flex justify-center items-center py-2 px-5 mt-4 text-base font-medium hover:bg-[rgb(5,90,180)] transition duration-200 rounded-lg"
                  >
                    {feature.buttonText}
                    <svg
                      className="w-4 h-4 ml-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
