"use server";

import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const RoleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["STUDENT", "FACULTY", "ADMIN"]),
});

export async function updateUserRole(data: { userId: string; role: string }) {
  const validated = RoleSchema.safeParse(data);

  if (!validated.success) {
    return { success: false, error: "Invalid input" };
  }

  const { userId, role } = validated.data;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/admin"); // optional
    return { success: true };
  } catch (error) {
    console.error("Failed to update role:", error);
    return { success: false, error: "Failed to update role" };
  }
}
