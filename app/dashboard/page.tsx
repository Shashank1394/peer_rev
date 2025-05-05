import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = async () => {
  return (
    <main className="min-h-screen sticky">
      {/* Navbar */}
      <nav className="flex justify-between sticky py-4 px-8 border-e-black border-b-2 shadow-md bg-white">
        <Link href="/dashboard">
          <h1 className="text-3xl">Dashboard</h1>
        </Link>
        <div className="flex gap-4">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/auth/login" });
            }}
          >
            <Button type="submit">Logout</Button>
          </form>
        </div>
      </nav>
    </main>
  );
};
export default Dashboard;
