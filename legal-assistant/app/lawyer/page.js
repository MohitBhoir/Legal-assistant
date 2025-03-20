"use client"
import FindLawyer from "../components/FindLawyer"
import { useSession } from "next-auth/react"

const page = () => {
  const { data: session } = useSession()

  if (!session || !session?.user) {
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