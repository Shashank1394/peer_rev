"use client";

import { useTransition } from "react";
import { updateUserRole } from "@/actions/admin/update-role";
import { Button } from "@/components/ui/button";

interface Props {
  userId: string;
  currentRole: string;
}

export function RoleSelector({ userId, currentRole }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (role: string) => {
    startTransition(() => {
      updateUserRole({ userId, role });
    });
  };

  return (
    <div className="flex gap-2">
      {["STUDENT", "FACULTY", "ADMIN"].map((role) => (
        <Button
          key={role}
          onClick={() => handleChange(role)}
          disabled={isPending || role === currentRole}
          variant={role === currentRole ? "default" : "outline"}
        >
          {role}
        </Button>
      ))}
    </div>
  );
}
