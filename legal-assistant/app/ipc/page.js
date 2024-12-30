'use client'
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function IpcCheck() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded || !isSignedIn) {
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
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-sky-200 min-h-screen h-screen flex items-center justify-center">
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

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-5xl font-extrabold text-[rgb(3,70,148)]">IPC Check</h1>
        <p className="text-lg text-gray-700">Choose an option below:</p>
        
        {/* Card Container */}
        <div className="flex flex-col md:flex-row items-center justify-center  gap-6 md:gap-6 sm:gap-32">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-96 h-auto md:h-[320px] flex flex-col items-center justify-between">
            <h2 className="text-5xl font-extrabold mb-4">Enter IPC</h2>
            <p className="text-gray-600 text-center mb-6">
              Input the IPC code to find detailed information about its corresponding legal provisions.
            </p>
            <Link 
              href="ipc/code" 
              className="px-6 py-3 bg-[rgb(3,70,148)] text-white font-semibold rounded-lg hover:bg-[rgb(5,90,180)] transition duration-200"
            >
              Go to IPC Code
            </Link>
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block h-[320px] bg-gray-300 w-[2px]"></div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-96 h-auto md:h-[320px] flex flex-col items-center justify-between">
            <h2 className="text-5xl font-extrabold mb-4">Enter Offense</h2>
            <p className="text-gray-600 text-center mb-6">
              Input the details of an offense to find applicable IPC codes and legal insights.
            </p>
            <Link 
              href="ipc/offense" 
              className="px-6 py-3 bg-[rgb(3,70,148)] text-white font-semibold rounded-lg hover:bg-[rgb(5,90,180)] transition duration-200"
            >
              Go to Offense
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
