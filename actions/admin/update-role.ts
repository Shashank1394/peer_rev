"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export async function updateUserRole({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: Role.ADMIN },
  });
}
