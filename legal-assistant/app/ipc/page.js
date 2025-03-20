'use client'
import Link from 'next/link';
import { auth } from '@/auth'

export default async function IpcCheck() {
  const session = await auth()

  if (!session || !session?.user) {
    // Handle loading state
    return (
      <div className="min-h-screen h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-sky-50 to-sky-200 px-4">
        {/* Left Section: Large Text */}
        <div className="flex flex-col items-start md:items-left text-left md:text-left md:pr-8 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[rgb(3,70,148)] leading-tight sm:ml-6">
            Discover Legal Provisions Like Never Before
          </h1>
          <p className="text-lg text-gray-700 sm:ml-6">
            Input IPC codes or offenses and get accurate legal insights.
          </p>
          <Link 
            href="/sign-up" 
            className="px-6 py-3 bg-[rgb(3,70,148)] text-white font-semibold rounded-lg hover:bg-[rgb(5,90,180)] transition duration-200 sm:ml-6"
          >
            Get Started
          </Link>
        </div>
  
        {/* Right Section: Image */}
        <div className="mt-6 md:mt-0 md:ml-8">
          <img 
            src="images/ipc_main_mockup_final.png" 
            alt="IPC Main Mockup" 
            className="w-64 md:w-96 bg-transparent"
          />
        </div>
      </div>
    );
  }
  

  return (
    <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 min-h-screen h-screen flex items-center justify-center bg-cover bg-center">
  {/* Main Content */}
  <div className="relative z-10 text-center space-y-6 px-4">
    <h1 className="text-2xl font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">IPC Check</h1>
    <p className="text-base md:text-lg text-gray-700">Choose an option below:</p>

    {/* Card Container */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
      {/* Card 1 */}
      <div className="flex flex-col items-center bg-white text-[rgb(3,70,148)] bg-opacity-80 shadow-md rounded-lg p-2 md:p-8  hover:scale-105 transition-transform">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Enter IPC</h2>
        <p className="text-gray-600 text-center text-sm md:text-base mb-6">
          Input the IPC code to find detailed information about its corresponding legal provisions.
        </p>
        <Link 
          href="ipc/code" 
          className="px-4 py-2 md:px-6 md:py-3 bg-[rgb(3,70,148)] text-white font-semibold rounded-lg hover:bg-[rgb(5,90,180)] transition duration-200"
        >
          Go to IPC Code
        </Link>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col items-center bg-white text-[rgb(3,70,148)] bg-opacity-80 shadow-md rounded-lg p-6 md:p-8  hover:scale-105 transition-transform">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Enter Offense</h2>
        <p className="text-gray-600 text-center text-sm md:text-base mb-6">
          Input the details of an offense to find applicable IPC codes and legal insights.
        </p>
        <Link 
          href="ipc/offense" 
          className="px-4 py-2 md:px-6 md:py-3 bg-[rgb(3,70,148)] text-white font-semibold rounded-lg hover:bg-[rgb(5,90,180)] transition duration-200"
        >
          Go to Offense
        </Link>
      </div>
    </div>
  </div>
</div>

  );
}
