import { auth } from "@/auth";
import ProjectForm from "@/components/dashboard/ProjectForm";
import Navbar from "@/components/navbar";

const Dashboard = async () => {
  const session = await auth();
  return (
    <main className="min-h-screen sticky">
      <Navbar userName={session?.user?.name} />
      <ProjectForm />
    </main>
  );
};
export default Dashboard;
