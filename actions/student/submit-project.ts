"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema } from "@/lib/validators/project";

export async function submitProject(data: z.infer<typeof formSchema>) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not authenticated");

  const validated = formSchema.parse(data);

  await prisma.project.create({
    data: {
      title: validated.title,
      description: validated.description,
      githubUrl: validated.githubUrl,
      reportUrl: validated.reportUrl,
      tags: validated.tags.split(",").map((tag) => tag.trim()),
      visibility: validated.visibility,
      userId: userId,
    },
  });

  revalidatePath("/dashboard");
}
