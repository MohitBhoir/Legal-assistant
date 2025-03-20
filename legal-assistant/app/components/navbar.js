"use client";

import { auth, signIn } from "@/auth";
import { Button, Navbar } from "flowbite-react";

export default async function Nav() {
  const session = await auth()

  return (
    <Navbar fluid rounded className="h-auto sticky top-0 z-50 bg-slate-200 shadow-xl">
      <Navbar.Brand href="/" className="text-3xl font-bold text-indigo-900">Logo</Navbar.Brand>
      {!session?.user ? (
        <form action={
          async () => {
            "use server"
            await signIn()
          }
        }>
          <div className="flex md:order-2">
            <Button href="/sign-up" className="border-2 bg-transparent border-blue-500 text-blue-500 px-2 py-2 sm:px-2 sm:py-2 rounded-full text-sm sm:text-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl w-full sm:w-auto ">Get started</Button>
            <Navbar.Toggle />
          </div>
        </form>
      ) : (
        <div className="flex md:order-2 gap-4">
          <Button href="/profile" className="border-2 bg-transparent border-blue-500 text-blue-500 rounded-full text-sm sm:text-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl w-full sm:w-auto ">
            Profile
          </Button>
          <UserButton className="mx-3" />
          <Navbar.Toggle />
        </div>
      )}

      <Navbar.Collapse>
        <Navbar.Link className="text-xl  custom-button" href="/" >
          <span className="custom-button">Home</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl  custom-button" href="#">
          <span className="custom-button">About</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl  custom-button" href="/templates">
          <span className="custom-button">Templates</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl  custom-button" href="/lawyer">
          <span className="custom-button">Lawyer</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl  custom-button" href="/ipc">
          <span className="custom-button">IPC</span>
        </Navbar.Link>
        <Navbar.Link className="text-xl  custom-button" href="/forum">
          <span className="custom-button">Forum</span>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
