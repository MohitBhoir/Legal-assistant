import { UserProfile } from "@clerk/nextjs"

const Profile = () => {
  return (
    <div className="bg-gradient-to-b from-sky-200 to-sky-50"><div className="flex justify-center m-4"><UserProfile/></div></div>
  )
}

export default Profile