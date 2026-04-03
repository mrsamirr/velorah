import * as z from 'zod'

/**
 * Admin validation schemas — categories, user management, moderation.
 */

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1, { error: 'Name is required.' })
    .max(50, { error: 'Name must be under 50 characters.' })
    .trim(),
  slug: z
    .string()
    .min(1, { error: 'Slug is required.' })
    .max(60)
    .regex(/^[a-z0-9-]+$/, { error: 'Slug may only contain lowercase letters, numbers, and hyphens.' }),
  description: z.string().max(300).optional(),
  color: z.string().max(20).optional(),
  icon: z.string().max(50).optional(),
  sort_order: z.number().int().min(0).default(0),
})

export const UpdateCategorySchema = z.object({
  name: z.string().min(1).max(50).trim().optional(),
  slug: z.string().min(1).max(60).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().max(300).optional(),
  color: z.string().max(20).optional(),
  icon: z.string().max(50).optional(),
  sort_order: z.number().int().min(0).optional(),
})

export const UpdateUserRoleSchema = z.object({
  user_id: z.string().uuid({ error: 'Invalid user.' }),
  role: z.enum(['reader', 'author', 'editor', 'admin'], { error: 'Invalid role.' }),
})

export const ResolveReportSchema = z.object({
  report_id: z.string().uuid({ error: 'Invalid report.' }),
  status: z.enum(['reviewed', 'resolved', 'dismissed'], { error: 'Invalid status.' }),
})
