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
    <div>
        <FindLawyer/>
    </div>
  )
}

export default page