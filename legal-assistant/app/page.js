'use client';

import React,{useState} from 'react'
import Navbar from './components/navbar'


const Hero = () => {
   const testimonials = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      stars: 5,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, ea, libero sint illum obcaecati culpa quaerat aliquam soluta repellat accusamus accusantium enim cupiditate. Earum, omnis id esse neque aperiam debitis accusantium tempora quod reprehenderit doloribus quasi, praesentium tenetur voluptatum placeat, dolore voluptate. Numquam molestiae atque error, ab ducimus itaque quo!',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      stars: 4,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, ea, libero sint illum obcaecati culpa quaerat aliquam soluta repellat accusamus accusantium enim cupiditate. Earum, omnis id esse neque aperiam debitis accusantium tempora quod reprehenderit doloribus quasi, praesentium tenetur voluptatum placeat, dolore voluptate. Numquam molestiae atque error, ab ducimus itaque quo!',
    },
    {
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      stars: 5,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, ea, libero sint illum obcaecati culpa quaerat aliquam soluta repellat accusamus accusantium enim cupiditate. Earum, omnis id esse neque aperiam debitis accusantium tempora quod reprehenderit doloribus quasi, praesentium tenetur voluptatum placeat, dolore voluptate. Numquam molestiae atque error, ab ducimus itaque quo!',
    },
    {
      name: 'Mark Wilson',
      email: 'mark.wilson@example.com',
      stars: 3,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, ea, libero sint illum obcaecati culpa quaerat aliquam soluta repellat accusamus accusantium enim cupiditate. Earum, omnis id esse neque aperiam debitis accusantium tempora quod reprehenderit doloribus quasi, praesentium tenetur voluptatum placeat, dolore voluptate. Numquam molestiae atque error, ab ducimus itaque quo!',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div>
      <Navbar/>
      <div
        className="h-screen flex items-center justify-center bg-cover bg-center relative text-center"
        style={{ backgroundImage: "url('/images/aibg.jpg')" }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div> */}
        <div className="bg-black bg-opacity-30 p-8 rounded-md text-white max-w-lg mx-3">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Service</h1>
          <p className="text-lg md:text-xl">Discover the best solutions tailored for your needs. Let us guide you to success!</p>
        </div>
      </div>

      {/* Section with Grid */}
      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-white">Our Features</h2>
          <div className="flex overflow-x-auto gap-4">
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full min-w-[800px]">
              <div className="bg-white bg-opacity-70 shadow-md rounded-md p-4 backdrop-blur-md">
                <h3 className="text-lg font-semibold">Feature 1</h3>
                <p className="mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia maiores repellat laborum voluptas? Voluptates, doloremque aliquam velit accusantium quibusdam error?</p>
              </div>
              <div className="bg-white bg-opacity-70 shadow-md rounded-md p-4 backdrop-blur-md">
                <h3 className="text-lg font-semibold">Feature 2</h3>
                <p className="mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam rem architecto maiores deserunt fugiat sed aperiam repellendus aut! Vitae, est!</p>
              </div>
              <div className="bg-white bg-opacity-70 shadow-md rounded-md p-4 backdrop-blur-md">
                <h3 className="text-lg font-semibold">Feature 3</h3>
                <p className="mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque repellendus tempora magnam iste commodi, enim dolores sit excepturi itaque similique.</p>
              </div>
              <div className="bg-white bg-opacity-70 shadow-md rounded-md p-4 backdrop-blur-md">
                <h3 className="text-lg font-semibold">Feature 4</h3>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sit ab at autem. Impedit repellat accusantium, porro pariatur at quas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Carousel */}
      <section className="py-12 bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">What Our Users Say</h2>
          <div className="relative">
            <div className="bg-white bg-opacity-70 shadow-md rounded-md p-6 backdrop-blur-md mx-auto max-w-2xl">
              <h3 className="text-lg font-semibold">{testimonials[currentIndex].name}</h3>
              <p className="text-sm text-gray-600">{testimonials[currentIndex].email}</p>
              <p className="text-yellow-500">
                {'★'.repeat(testimonials[currentIndex].stars)}
                {'☆'.repeat(5 - testimonials[currentIndex].stars)}
              </p>
              <p className="mt-4">{testimonials[currentIndex].review}</p>
            </div>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={handlePrev}
            >
              &#8592;
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={handleNext}
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-black bg-opacity-50 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="hidden md:block">
            <h3 className="text-lg font-bold">About Us</h3>
            <p className="mt-2 text-sm">
              We provide the best solutions to help you achieve your goals. Our team is dedicated to ensuring your success.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p className="mt-2 text-sm">Email: support@example.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
            <p className="text-sm">Address: 123 Main Street, Anytown, USA</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Follow Us</h3>
            <p className="mt-2 text-sm">
              <a href="#" className="hover:underline">Facebook</a>
            </p>
            <p className="text-sm">
              <a href="#" className="hover:underline">Twitter</a>
            </p>
            <p className="text-sm">
              <a href="#" className="hover:underline">LinkedIn</a>
            </p>
          </div>
        </div>
        <div className="text-center mt-6 text-sm">
          © 2024 Your Company. All Rights Reserved.
        </div>
      </footer>

    </div>
  )
}

export default Hero


      
