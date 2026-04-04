'use server'

import { revalidatePath } from 'next/cache'
import { likeArticle, unlikeArticle, likeComment, unlikeComment } from '@/lib/dal/likes'
import { bookmarkArticle, unbookmarkArticle } from '@/lib/dal/bookmarks'
import { createComment, updateComment, deleteComment, hideComment } from '@/lib/dal/comments'
import { followUser, unfollowUser } from '@/lib/dal/follows'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'
import { CreateCommentSchema, UpdateCommentSchema, ReportSchema } from '@/lib/schemas/engagement'
import type { CommentFormState } from '@/lib/schemas/engagement'

// ─── Likes ────────────────────────────────────────

export async function likeArticleAction(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await likeArticle(articleId)
  if (result.success) revalidatePath(`/article`)
  return result
}

export async function unlikeArticleAction(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await unlikeArticle(articleId)
  if (result.success) revalidatePath(`/article`)
  return result
}

export async function likeCommentAction(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  return likeComment(commentId)
}

export async function unlikeCommentAction(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  return unlikeComment(commentId)
}

// ─── Bookmarks ────────────────────────────────────

export async function bookmarkArticleAction(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await bookmarkArticle(articleId)
  if (result.success) revalidatePath(`/article`)
  return result
}

export async function unbookmarkArticleAction(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await unbookmarkArticle(articleId)
  if (result.success) revalidatePath(`/article`)
  return result
}

// ─── Comments ─────────────────────────────────────

export async function createCommentAction(
  state: CommentFormState,
  formData: FormData
): Promise<CommentFormState & { id?: string }> {
  const validatedFields = CreateCommentSchema.safeParse({
    article_id: formData.get('article_id'),
    parent_id: formData.get('parent_id') || undefined,
    body: formData.get('body'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const result = await createComment(validatedFields.data)

  if ('error' in result) {
    return { message: result.error }
  }

  revalidatePath(`/article`)
  return { id: result.id }
}

export async function updateCommentAction(
  commentId: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const validatedFields = UpdateCommentSchema.safeParse({
    body: formData.get('body'),
  })

  if (!validatedFields.success) {
    return { success: false, error: 'Invalid comment content' }
  }

  const result = await updateComment(commentId, validatedFields.data.body)
  if (result.success) revalidatePath(`/article`)
  return result
}

export async function deleteCommentAction(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await deleteComment(commentId)
  if (result.success) revalidatePath(`/article`)
  return result
}

export async function hideCommentAction(
  commentId: string,
  hidden: boolean
): Promise<{ success: boolean; error?: string }> {
  const result = await hideComment(commentId, hidden)
  if (result.success) revalidatePath(`/article`)
  return result
}

// ─── Follows ──────────────────────────────────────

export async function followAction(
  followingId: string
): Promise<{ success: boolean; error?: string }> {
  return followUser(followingId)
}

export async function unfollowAction(
  followingId: string
): Promise<{ success: boolean; error?: string }> {
  return unfollowUser(followingId)
}

// ─── Reports ──────────────────────────────────────

export async function reportAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()

  const validatedFields = ReportSchema.safeParse({
    entity_type: formData.get('entity_type'),
    entity_id: formData.get('entity_id'),
    reason: formData.get('reason'),
    description: formData.get('description') || undefined,
  })

  if (!validatedFields.success) {
    return { success: false, error: 'Invalid report data' }
  }
  const supabase = await createClient()

  const { error } = await supabase.from('reports').insert({
    reporter_id: user.id,
    ...validatedFields.data,
  })

  if (error) {
    if (error.code === '23505') return { success: false, error: 'Already reported' }
    console.error('Report failed:', error.message)
    return { success: false, error: 'Failed to submit report' }
  }

  return { success: true }
}
