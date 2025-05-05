// app/dashboard/page.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <main className="w-full flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-gray-200 p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-6">PeerRev</h2>
        <nav className="space-y-3">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
          </Link>
          <Link href="/submissions">
            <Button variant="ghost" className="w-full justify-start">
              Submissions
            </Button>
          </Link>
          <Link href="/reviews">
            <Button variant="ghost" className="w-full justify-start">
              Reviews
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Your Role</h3>
              <p className="text-gray-600">{user?.role}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Your Submissions</h3>
              <p className="text-gray-600">3 Submitted</p>
              <Link href="/submissions">
                <Button variant="link" className="mt-2 p-0 text-blue-600">
                  View Submissions <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Pending Reviews</h3>
              <p className="text-gray-600">2 To Review</p>
              <Link href="/reviews">
                <Button variant="link" className="mt-2 p-0 text-blue-600">
                  Review Now <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Button
            onClick={() => toast.success("This is a toast from the dashboard!")}
          >
            Show Toast
          </Button>
        </div>
      </section>
    </main>
  );
}
