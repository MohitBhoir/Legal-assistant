"use client"
import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function RegTemplate() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded || !isSignedIn) {
    // Handle loading state
    return null
  }

  const features = [
    {
      image: '/images/lease.png',
      heading: 'Lease',
      buttonText: 'Get Started',
      link: 'lease',
    },
    {
      image: '/images/name.png',
      heading: 'Name Change',
      buttonText: 'Get Started',
      link: 'name-change',
    },
    {
      image: '/images/property.png',
      heading: 'Property',
      buttonText: 'Get Started',
      link: 'property',
    },
    {
      image: '/images/property.png',
      heading: 'Property',
      buttonText: 'Get Started',
      link: 'property',
    },
    {
      image: '/images/property.png',
      heading: 'Property',
      buttonText: 'Get Started',
      link: 'property',
    },
  ];
  return (
    <section className=" w-full h-flex flex-col justify-center bg-cover bg-center"
    style={{ backgroundImage: 'url(/images/doc.jpg)' }}>

      
      <div className="py-4 px-6 mx-auto max-w-screen-lg text-center lg:py-14">
        <h1 className="mb-8 text-2xl font-extrabold tracking-tight leading-none text-[rgb(3,70,148)] md:text-3xl lg:text-4xl">
          Document Templates
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white text-[rgb(3,70,148)] bg-opacity-80 shadow-md rounded-lg p-6 backdrop-blur-md"
            >
              <img
                src={feature.image}
                alt={feature.heading}
                className="mb-5 w-full h-32 object-contain rounded-lg"
              />
              <h3 className="text-lg font-semibold">{feature.heading}</h3>
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
          ))}
        </div>
      </div>
    </section>
  );
}
