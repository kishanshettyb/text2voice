import { z } from 'zod'

export const speechSchema = z.object({
  text: z
    .string()
    .min(1, {
      message: 'Please add some words and try again...'
    })
    .max(50)
})
