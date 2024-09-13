"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Store, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState } from "react";

const NavBar = () => {
  const { setTheme } = useTheme();
  const [themeNumber, setThemeNumber] = useState(0);

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
          <Button
            onClick={() => {
              if (themeNumber == 0) {
                setThemeNumber(1);
                setTheme("dark");
              }
              if (themeNumber == 1) {
                setThemeNumber(0);
                setTheme("light");
              }
            }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button>
          <UserButton />
        </Authenticated>
        <AuthLoading>Loading...</AuthLoading>
      </div>
    </header>
  );
};

export default NavBar;
