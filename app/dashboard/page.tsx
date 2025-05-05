import { auth, signOut } from "@/auth";
import ProjectForm from "@/components/dashboard/ProjectForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = async () => {
  const session = await auth();

  return (
    <main className="min-h-screen sticky">
      {/* Navbar */}
      <nav className="flex justify-between sticky py-4 px-8 border-e-black border-b-2 shadow-md bg-white">
        <Link href="/dashboard">
          <h1 className="text-3xl">Dashboard</h1>
        </Link>
        <div className="flex gap-4">
          <p className="text-2xl">{session?.user?.name}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/auth/login" });
            }}
          >
            <Button type="submit" className="rounded-full">
              Logout
            </Button>
          </form>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center p-8">
        <ProjectForm />
      </div>
    </main>
  );
};
export default Dashboard;
