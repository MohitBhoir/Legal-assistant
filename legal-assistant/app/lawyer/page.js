"use client"
import FindLawyer from "../components/FindLawyer"
import { useUser } from "@clerk/nextjs"

const page = () => {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded || !isSignedIn) {
    // Handle loading state
    return null
  }
  
  return (
    <div className="relative bg-cover bg-center h-screen" 
    style={{ backgroundImage: 'url(/images/law.jpg)' }}>
    <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
    <div className="relative z-10">
      <FindLawyer />
    </div>
  </div>

  )
}

export default page