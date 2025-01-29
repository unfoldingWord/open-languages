import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  language_name: z.string(),
  language_code: z.string(),
  region: z.string(),
  country: z.string(),
  // label: z.string(),
})

export type Task = z.infer<typeof taskSchema>