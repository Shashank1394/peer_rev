"use client";

import { useTransition } from "react";
import { updateUserRole } from "@/actions/admin/update-role";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  userId: string;
  currentRole: string;
}

export function RoleSelector({ userId, currentRole }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (role: string) => {
    startTransition(async () => {
      const result = await updateUserRole({ userId, role });

      if (result?.success) {
        toast.success(`User role updated to ${role}`);
      } else {
        toast.error(result?.error || "Failed to update user role");
      }
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
