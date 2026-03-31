import * as z from 'zod'

/**
 * Article validation schemas.
 * Used by Server Actions to validate input BEFORE touching the database.
 */

export const CreateArticleSchema = z.object({
  title: z
    .string()
    .min(1, { error: 'Title is required.' })
    .max(200, { error: 'Title must be under 200 characters.' })
    .trim(),
  content: z
    .string()
    .min(1, { error: 'Content is required.' }),
  excerpt: z
    .string()
    .max(500, { error: 'Excerpt must be under 500 characters.' })
    .optional(),
  cover_image_url: z
    .string()
    .url({ error: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
  category: z
    .string()
    .max(50, { error: 'Category must be under 50 characters.' })
    .optional(),
  status: z.enum(['draft', 'published']).default('draft'),
})

export const UpdateArticleSchema = z.object({
  title: z
    .string()
    .min(1, { error: 'Title is required.' })
    .max(200, { error: 'Title must be under 200 characters.' })
    .trim()
    .optional(),
  content: z.string().min(1, { error: 'Content is required.' }).optional(),
  excerpt: z
    .string()
    .max(500, { error: 'Excerpt must be under 500 characters.' })
    .optional(),
  cover_image_url: z
    .string()
    .url({ error: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
  category: z
    .string()
    .max(50, { error: 'Category must be under 50 characters.' })
    .optional(),
  status: z.enum(['draft', 'published']).optional(),
})

export const UpdateProfileSchema = z.object({
  display_name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters.' })
    .max(50, { error: 'Name must be under 50 characters.' })
    .trim()
    .optional(),
  bio: z
    .string()
    .max(500, { error: 'Bio must be under 500 characters.' })
    .optional(),
  avatar_url: z
    .string()
    .url({ error: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
})

export type ArticleFormState =
  | {
      errors?: Record<string, string[]>
      message?: string
    }
  | undefined

export type ProfileFormState =
  | {
      errors?: Record<string, string[]>
      message?: string
    }
  | undefined
