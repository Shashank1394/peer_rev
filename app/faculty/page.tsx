import { auth } from "@/auth";
import Navbar from "@/components/navbar";

const FacultyPage = async () => {
  const session = await auth();
  return (
    <main>
      <Navbar userName={session?.user?.name} />
    </main>
  );
};
export default FacultyPage;
