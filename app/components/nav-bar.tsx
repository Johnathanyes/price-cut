"use client";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Store } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header className="flex flex-row justify-around gap-[200px] w-full pt-4 bg-stone-800">
      <div className="flex flex-row">
        <Store size={28} color="#ffffff" strokeWidth={1.5} />
        <h2>
          <Link href="/dashboard">PriceCut</Link>
        </h2>
      </div>
      <div className="flex flex-row">
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
        <AuthLoading>Loading...</AuthLoading>
      </div>
    </header>
  );
};

export default NavBar;
