"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  githubUrl: z.string().url(),
  reportUrl: z.string().url().optional(),
  tags: z.string(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
});

export async function submitProject(data: z.infer<typeof formSchema>) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not authenticated");

  await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      githubUrl: data.githubUrl,
      reportUrl: data.reportUrl,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      visibility: data.visibility,
      userId: userId,
    },
  });

  revalidatePath("/dashboard");
}
