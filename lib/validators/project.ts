import { z } from "zod";

export const formSchema = z.object({
  name: z.string(),
  title: z.string().min(3),
  description: z.string().min(10),
  githubUrl: z.string().url(),
  reportUrl: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || /^https?:\/\//.test(val), {
      message: "Invalid URL",
    }),
  tags: z.string(),
  visibility: z.enum(["PUBLIC", "PRIVATE", "GROUP_ONLY"]),
});
