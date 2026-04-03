import * as z from 'zod'

/**
 * Content validation schemas.
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
  content_raw: z.string().optional(),
  excerpt: z
    .string()
    .max(500, { error: 'Excerpt must be under 500 characters.' })
    .optional(),
  cover_image_url: z
    .string()
    .url({ error: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
  cover_image_alt: z
    .string()
    .max(200, { error: 'Alt text must be under 200 characters.' })
    .optional(),
  category_id: z
    .string()
    .uuid({ error: 'Invalid category.' })
    .optional()
    .or(z.literal('')),
  tag_ids: z
    .array(z.string().uuid())
    .max(5, { error: 'Maximum 5 tags allowed.' })
    .optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  allow_comments: z.boolean().default(true),
  scheduled_at: z
    .string()
    .datetime({ error: 'Invalid date format.' })
    .optional()
    .or(z.literal('')),
  meta_title: z
    .string()
    .max(70, { error: 'Meta title must be under 70 characters.' })
    .optional(),
  meta_description: z
    .string()
    .max(160, { error: 'Meta description must be under 160 characters.' })
    .optional(),
  canonical_url: z
    .string()
    .url({ error: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
})

export const UpdateArticleSchema = z.object({
  title: z
    .string()
    .min(1, { error: 'Title is required.' })
    .max(200, { error: 'Title must be under 200 characters.' })
    .trim()
    .optional(),
  content: z.string().min(1, { error: 'Content is required.' }).optional(),
  content_raw: z.string().optional(),
  excerpt: z
    .string()
    .max(500, { error: 'Excerpt must be under 500 characters.' })
    .optional(),
  cover_image_url: z
    .string()
    .url({ error: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
  cover_image_alt: z
    .string()
    .max(200)
    .optional(),
  category_id: z
    .string()
    .uuid({ error: 'Invalid category.' })
    .optional()
    .or(z.literal('')),
  tag_ids: z
    .array(z.string().uuid())
    .max(5, { error: 'Maximum 5 tags allowed.' })
    .optional(),
  status: z.enum(['draft', 'published', 'archived', 'under_review']).optional(),
  is_pinned: z.boolean().optional(),
  allow_comments: z.boolean().optional(),
  scheduled_at: z
    .string()
    .datetime({ error: 'Invalid date format.' })
    .optional()
    .or(z.literal('')),
  meta_title: z.string().max(70).optional(),
  meta_description: z.string().max(160).optional(),
  canonical_url: z
    .string()
    .url({ error: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
})

export const UpdateProfileSchema = z.object({
  display_name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters.' })
    .max(50, { error: 'Name must be under 50 characters.' })
    .trim()
    .optional(),
  username: z
    .string()
    .min(3, { error: 'Username must be at least 3 characters.' })
    .max(30, { error: 'Username must be under 30 characters.' })
    .regex(/^[a-z0-9_-]+$/, { error: 'Username may only contain lowercase letters, numbers, hyphens, and underscores.' })
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
  cover_image_url: z
    .string()
    .url({ error: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
  website_url: z
    .string()
    .url({ error: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(100, { error: 'Location must be under 100 characters.' })
    .optional(),
  social_links: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
  }).optional(),
  email_notifications: z.boolean().optional(),
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