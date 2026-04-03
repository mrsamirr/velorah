import * as z from 'zod'

/**
 * Engagement validation schemas — comments, likes, bookmarks, reports.
 */

export const CreateCommentSchema = z.object({
  article_id: z.string().uuid({ error: 'Invalid article.' }),
  parent_id: z.string().uuid({ error: 'Invalid parent comment.' }).optional().or(z.literal('')),
  body: z
    .string()
    .min(1, { error: 'Comment cannot be empty.' })
    .max(5000, { error: 'Comment must be under 5000 characters.' }),
})

export const UpdateCommentSchema = z.object({
  body: z
    .string()
    .min(1, { error: 'Comment cannot be empty.' })
    .max(5000, { error: 'Comment must be under 5000 characters.' }),
})

export const LikeSchema = z.object({
  article_id: z.string().uuid().optional(),
  comment_id: z.string().uuid().optional(),
}).refine(
  (data) => (data.article_id && !data.comment_id) || (!data.article_id && data.comment_id),
  { error: 'Must specify exactly one of article_id or comment_id.' }
)

export const BookmarkSchema = z.object({
  article_id: z.string().uuid({ error: 'Invalid article.' }),
})

export const ReportSchema = z.object({
  entity_type: z.enum(['article', 'comment', 'profile'], { error: 'Invalid entity type.' }),
  entity_id: z.string().uuid({ error: 'Invalid entity.' }),
  reason: z.enum(['spam', 'harassment', 'misinformation', 'copyright', 'other'], { error: 'Invalid reason.' }),
  description: z.string().max(1000, { error: 'Description must be under 1000 characters.' }).optional(),
})

export type CommentFormState =
  | {
      errors?: Record<string, string[]>
      message?: string
    }
  | undefined
