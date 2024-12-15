import React from 'react'
import Navbar from './components/navbar'

const Hero = () => {
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
    </div>
  )
}

export default Hero


      
