"use client";
import { Button, Navbar } from "flowbite-react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Nav() {
  const { data: session, status } = useSession();

  console.log("Session Data:", session);
  console.log("Session Status:", status);

  return (
    <Navbar fluid rounded className="h-auto sticky top-0 z-50 bg-slate-200 shadow-xl">
      <Navbar.Brand href="/" className="text-3xl font-bold text-indigo-900">
        Logo
      </Navbar.Brand>

      {/* Show Sign In button if user is not logged in */}
      {status === "loading" ? (
        <div className="flex md:order-2"> 
          <p className="text-blue-500">Loading...</p> 
        </div>
      ) : !session || !session.user ? (
        <div className="flex md:order-2">
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="border-2 bg-transparent border-blue-500 text-blue-500 px-2 py-2 sm:px-2 sm:py-2 rounded-full text-sm sm:text-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl w-full sm:w-auto"
          >
            Get started
          </Button>
          <Navbar.Toggle />
          {console.log("User is not logged in")}
        </div>
      ) : (
        // Show user profile picture if logged in
        <div className="flex md:order-2 gap-4">
          <div className="border-2 bg-transparent text-blue-500 rounded-full text-sm sm:text-xl font-semibold hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl w-full sm:w-auto p-2">
            <Image
              src={session?.user?.image || "/images/doc.jpg"}
              alt="User Avatar"
              className="rounded-full object-cover"
              height={35}
              width={35}
            />
            {console.log("User is logged in")}
          </div>
          <Navbar.Toggle />
        </div>
      )}

      <Navbar.Collapse>
        <Navbar.Link className="text-xl custom-button" href="/">
          <span className="custom-button">Home</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl custom-button" href="#">
          <span className="custom-button">About</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl custom-button" href="/templates">
          <span className="custom-button">Templates</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl custom-button" href="/lawyer">
          <span className="custom-button">Lawyer</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl custom-button" href="/ipc">
          <span className="custom-button">IPC</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl custom-button" href="/forum">
          <span className="custom-button">Forum</span>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
