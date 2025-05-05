"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/logout";

interface NavbarProps {
  userName?: string;
}

const Navbar = ({ userName }: NavbarProps) => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <nav className="flex justify-between sticky py-4 px-8 border-e-black border-b-2 shadow-md bg-white">
      <Link href={isDashboard ? "/dashboard" : "/faculty"}>
        <h1 className="text-3xl">
          {isDashboard ? "Student" : "Faculty"} Dashboard
        </h1>
      </Link>
      <div className="flex gap-4">
        <p className="text-2xl">{userName}</p>
        <form action={logout}>
          <Button type="submit" className="rounded-full">
            Logout
          </Button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
