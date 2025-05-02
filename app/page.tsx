"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen relative z-10">
      {/* Hero Section - Centered */}
      <section className="flex flex-1 items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900">PeerRev</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
            Showcase, Review, and Elevate Academic Projects with Peer Feedback.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline">Register</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t bg-white">
        © {new Date().getFullYear()} PeerRev. All rights reserved.
      </footer>
    </main>
  );
}
