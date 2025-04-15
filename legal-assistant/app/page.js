'use client';

import React, { useState, useEffect } from 'react'
import { FaPlay } from 'react-icons/fa';
import Image from "next/image";
import TestimonialsCarousel from './components/Reviews';
import Link from "next/link";


const Hero = () => {
  useEffect(() => {
    // Ensure the page loads at the top
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);



  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div>

      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-400 to-cyan-400 h-screen
  rounded-bl-[10rem] shadow-2xl">
        {/* Animated Background Lines */}
        <div className="absolute inset-0">
          {/* Line 1 */}
          <div className="absolute w-[2px] h-full bg-orange-200 animate-line-up left-1/4 sm:left-1/3 md:left-1/4"></div>
          {/* Line 2 */}
          <div className="absolute w-[2px] h-full bg-orange-200 animate-line-down left-1/2 sm:left-2/3 md:left-1/2"></div>
          {/* Line 3 */}
          <div className="absolute h-[2px] w-full bg-orange-200 animate-line-left top-1/3 sm:top-1/4 md:top-1/3"></div>
          {/* Line 4 */}
          <div className="absolute h-[2px] w-full bg-orange-200 animate-line-right top-2/3 sm:top-3/4 md:top-2/3"></div>
        </div>

        {/* Content */}
        <div className="relative flex items-center justify-center w-full h-full z-10 text-center">
          <div className="bg-transparent bg-opacity-30 p-8 rounded-md text-white max-w-full mx-3">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-indigo-950 leading-tight">
              Welcome to Legal Assistant
            </h1>
            <p className="text-lg md:text-xl text-indigo-800 leading-relaxed mb-6">
              Provides administrative and research support to lawyers,
              <br /> aiding in case preparation, document management, and client communication.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Get Started Button */}
              <Link
                  href={'/sign-up'}
                  className="border-2 border-blue-500 text-blue-500 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl w-full sm:w-auto"
              >
                Get Started
              </Link>

              {/* Demo Video Button */}
              <button className="border-2 border-orange-500 text-orange-500 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center w-full sm:w-auto">
                <FaPlay className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> {/* Adjusted icon size */}
                Demo Video
              </button>
            </div>
          </div>
        </div>

      </div>
      {/* Features Boxes */}
      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-white">Our Features</h2>
          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 opacity-0 transition-opacity duration-700 ease-in-out scroll-animate">
              <Image
                src="/images/findLawyer.png"
                alt="Feature 1 Image"
                width={500}
                height={300}
                className="w-full md:w-1/2 h-auto rounded-lg shadow-xl"
              />
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-opacity-70 shadow-xl rounded-md p-6 backdrop-blur-md w-full md:w-1/2 md:h-[350px]">
                <h3 className="text-2xl font-semibold text-[rgb(3,70,148)]">Assistance in legal research</h3>
                <p className="mt-2 text-white">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia maiores repellat laborum voluptas? Voluptates, doloremque aliquam velit accusantium quibusdam error?
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6 md:gap-12 opacity-0 transition-opacity duration-700 ease-in-out scroll-animate">
              <Image
                src="/images/ipc.png"
                alt="Feature 2 Image"
                width={500}
                height={300}
                className="w-full md:w-1/2 h-auto rounded-lg shadow-xl"
              />
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-opacity-70 shadow-xl rounded-md p-6 backdrop-blur-md w-full md:w-1/2 md:h-[350px]">
                <h3 className="text-2xl font-semibold text-[rgb(3,70,148)]">IPC Similarities</h3>
                <p className="mt-2 text-white">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam rem architecto maiores deserunt fugiat sed aperiam repellendus aut! Vitae, est!
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 opacity-0 transition-opacity duration-700 ease-in-out scroll-animate">
              <Image
                src="/images/template.png"
                alt="Feature 3 Image"
                width={500}
                height={300}
                className="w-full md:w-1/2 h-auto rounded-lg shadow-xl"
              />
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-opacity-70 shadow-xl rounded-md p-6 backdrop-blur-md w-full md:w-1/2 md:h-[350px]">
                <h3 className="text-lg font-semibold">Template Document Generation</h3>
                <p className="mt-2 text-white">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia maiores repellat laborum voluptas? Voluptates, doloremque aliquam velit accusantium quibusdam error?
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            {/* <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6 md:gap-12 opacity-0 transition-opacity duration-700 ease-in-out scroll-animate">
            <Image
              src="/path-to-image4.jpg"
              alt="Feature 4 Image"
              width={500}
              height={300}
              className="w-full md:w-1/2 h-auto rounded-lg shadow-xl"
            />
            <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-opacity-70 shadow-xl rounded-md p-6 backdrop-blur-md w-full md:w-1/2 md:h-[350px]">
              <h3 className="text-lg font-semibold">Help Forum</h3>
              <p className="mt-2 text-white">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam rem architecto maiores deserunt fugiat sed aperiam repellendus aut! Vitae, est!
              </p>
            </div>
          </div> */}

          </div>
        </div>
      </section>


      {/* Testimonials Carousel */}
      <section className="bg-gradient-to-r from-indigo-400 to-cyan-400 py-12
      shadow-2xl mb-[8rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-white">What Our Clients Say</h2>
          <TestimonialsCarousel />
        </div>
      </section>
    </div>
  )
}

export default Hero


