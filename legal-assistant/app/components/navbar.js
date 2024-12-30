"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Button, Navbar, Avatar, Dropdown } from "flowbite-react";
import { useAuth } from "@clerk/nextjs";

export default function Nav() {
  const { userId } = useAuth();
  const {user} = useUser()
   return (
    <Navbar fluid rounded className="h-auto">
      <Navbar.Brand href="/">Logo</Navbar.Brand>
      {!userId ? (
      <div className="flex md:order-2">
      <Button href="/sign-up">Get started</Button>
      <Navbar.Toggle />
    </div>
      ) : (
        <div className="flex md:order-2">
          <Button href="/profile" className="mx-3">Profile</Button>
          <UserButton className="mx-3"/>
        <Navbar.Toggle />
      </div>
      )} 

      <Navbar.Collapse >
        <Navbar.Link  className= "text-xl" href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link className= "text-xl" href="#">About</Navbar.Link>
        <Navbar.Link className= "text-xl" href="/templates">Templates</Navbar.Link>
        <Navbar.Link className= "text-xl" href="/lawyer">Lawyer</Navbar.Link>
        <Navbar.Link  className= "text-xl"href="/ipc">IPC</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
