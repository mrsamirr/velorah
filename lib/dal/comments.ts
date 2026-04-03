import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'
import { sanitizeCommentHtml } from '@/lib/utils/sanitize'

export type CommentDTO = {
  id: string
  article_id: string
  author_id: string
  author_name: string | null
  author_avatar: string | null
  author_username: string | null
  parent_id: string | null
  body: string
  is_edited: boolean
  is_hidden: boolean
  like_count: number
  created_at: string
  updated_at: string
  replies?: CommentDTO[]
}

const COMMENT_SELECT = `
  id, article_id, author_id, parent_id, body, is_edited, is_hidden,
  like_count, created_at, updated_at,
  profiles!comments_author_id_fkey(display_name, avatar_url, username)
`

function mapCommentRow(row: Record<string, unknown>): CommentDTO {
  const profile = row.profiles as { display_name: string; avatar_url: string | null; username: string } | null
  return {
    id: row.id as string,
    article_id: row.article_id as string,
    author_id: row.author_id as string,
    author_name: profile?.display_name || null,
    author_avatar: profile?.avatar_url || null,
    author_username: profile?.username || null,
    parent_id: row.parent_id as string | null,
    body: row.body as string,
    is_edited: row.is_edited as boolean,
    is_hidden: row.is_hidden as boolean,
    like_count: (row.like_count as number) || 0,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }
}

/**
 * Get comments for an article in a threaded structure.
 */
export async function getCommentsByArticle(articleId: string): Promise<CommentDTO[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('comments')
    .select(COMMENT_SELECT)
    .eq('article_id', articleId)
    .order('created_at', { ascending: true })

  if (error || !data) return []

  const all = data.map((row: Record<string, unknown>) => mapCommentRow(row))

  // Build threaded structure
  const rootComments: CommentDTO[] = []
  const childMap = new Map<string, CommentDTO[]>()

  for (const comment of all) {
    if (comment.parent_id) {
      const children = childMap.get(comment.parent_id) || []
      children.push(comment)
      childMap.set(comment.parent_id, children)
    } else {
      rootComments.push(comment)
    }
  }

  for (const root of rootComments) {
    root.replies = childMap.get(root.id) || []
  }

  return rootComments
}

/**
 * Create a comment on an article.
 */
export async function createComment(input: {
  article_id: string
  parent_id?: string
  body: string
}): Promise<{ id: string } | { error: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const sanitizedBody = sanitizeCommentHtml(input.body)

  const { data, error } = await supabase
    .from('comments')
    .insert({
      article_id: input.article_id,
      author_id: user.id,
      parent_id: input.parent_id || null,
      body: sanitizedBody,
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error('Comment creation failed:', error?.message)
    return { error: 'Failed to create comment' }
  }

  // Increment comment count on article
  supabase.rpc('increment_comment_count', { target_article_id: input.article_id, delta: 1 }).then()

  // Create notification for article author
  const { data: article } = await supabase
    .from('articles')
    .select('author_id, title')
    .eq('id', input.article_id)
    .single()

  if (article && article.author_id !== user.id) {
    supabase.rpc('create_notification', {
      p_recipient_id: article.author_id,
      p_actor_id: user.id,
      p_type: 'comment',
      p_entity_type: 'article',
      p_entity_id: input.article_id,
      p_message: `commented on "${article.title}"`,
    }).then()
  }

  return { id: data.id }
}

/**
 * Update a comment. Author only.
 */
export async function updateComment(
  commentId: string,
  body: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const sanitizedBody = sanitizeCommentHtml(body)

  const { error } = await supabase
    .from('comments')
    .update({ body: sanitizedBody, is_edited: true })
    .eq('id', commentId)
    .eq('author_id', user.id)

  if (error) {
    console.error('Comment update failed:', error.message)
    return { success: false, error: 'Failed to update comment' }
  }

  return { success: true }
}

/**
 * Delete a comment. Author only.
 */
export async function deleteComment(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  // Get article_id for count update
  const { data: comment } = await supabase
    .from('comments')
    .select('article_id, author_id')
    .eq('id', commentId)
    .single()

  if (!comment || comment.author_id !== user.id) {
    return { success: false, error: 'Forbidden' }
  }

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('author_id', user.id)

  if (error) {
    console.error('Comment deletion failed:', error.message)
    return { success: false, error: 'Failed to delete comment' }
  }

  supabase.rpc('increment_comment_count', { target_article_id: comment.article_id, delta: -1 }).then()

  return { success: true }
}

/**
 * Hide a comment. Admin or article author only.
 */
export async function hideComment(
commentId: string, hidden: boolean): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  // Check if user is admin or article author
  const { data: comment } = await supabase
    .from('comments')
    .select('article_id')
    .eq('id', commentId)
    .single()

  if (!comment) return { success: false, error: 'Comment not found' }

  const { data: article } = await supabase
    .from('articles')
    .select('author_id')
    .eq('id', comment.article_id)
    .single()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (article?.author_id !== user.id && profile?.role !== 'admin') {
    return { success: false, error: 'Forbidden' }
  }

  const { error } = await supabase
    .from('comments')
    .update({ is_hidden: true })
    .eq('id', commentId)

  if (error) {
    return { success: false, error: 'Failed to hide comment' }
  }

  return { success: true }
}
