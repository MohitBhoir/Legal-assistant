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
  ];
  return (
    <section className=" mt-[92px] w-full h-auto flex flex-col justify-center">
      <div className="py-4 px-6 mx-auto max-w-screen-lg text-center lg:py-14">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl">
          Explore Our Features
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white text-black bg-opacity-80 shadow-md rounded-lg p-6 backdrop-blur-md hover:shadow-lg hover:bg-opacity-90 transition-all hover:scale-105"
            >
              <img
                src={feature.image}
                alt={feature.heading}
                className="mb-5 w-full h-32 object-contain rounded-lg"
              />
              <h3 className="text-lg font-semibold">{feature.heading}</h3>
              <Link href={`/templates/${feature.link}`}>
                
                  <button
                    className="text-white inline-flex justify-center items-center py-2 px-5 mt-4 text-base font-medium bg-teal-600 rounded-lg hover:bg-teal-500 transition-all"
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
