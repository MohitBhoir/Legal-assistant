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
    <div className=" bg-cover bg-center bg-gradient-to-r from-indigo-400 to-cyan-400" >
    <FindLawyer/>
  </div>

  )
}

export default page