import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'

/**
 * Like an article.
 */
export async function likeArticle(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('likes')
    .insert({ user_id: user.id, article_id: articleId })

  if (error) {
    if (error.code === '23505') return { success: false, error: 'Already liked' }
    console.error('Like failed:', error.message)
    return { success: false, error: 'Failed to like article' }
  }

  supabase.rpc('increment_like_count', { target_article_id: articleId, delta: 1 }).then()

  // Notify article author
  const { data: article } = await supabase
    .from('articles')
    .select('author_id, title')
    .eq('id', articleId)
    .single()

  if (article && article.author_id !== user.id) {
    supabase.rpc('create_notification', {
      p_recipient_id: article.author_id,
      p_actor_id: user.id,
      p_type: 'like',
      p_entity_type: 'article',
      p_entity_id: articleId,
      p_message: `liked "${article.title}"`,
    }).then()
  }

  return { success: true }
}

/**
 * Unlike an article.
 */
export async function unlikeArticle(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', user.id)
    .eq('article_id', articleId)

  if (error) {
    console.error('Unlike failed:', error.message)
    return { success: false, error: 'Failed to unlike' }
  }

  supabase.rpc('increment_like_count', { target_article_id: articleId, delta: -1 }).then()

  return { success: true }
}

/**
 * Like a comment.
 */
export async function likeComment(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('likes')
    .insert({ user_id: user.id, comment_id: commentId })

  if (error) {
    if (error.code === '23505') return { success: false, error: 'Already liked' }
    return { success: false, error: 'Failed to like comment' }
  }

  supabase.rpc('increment_comment_like_count', { target_comment_id: commentId, delta: 1 }).then()

  return { success: true }
}

/**
 * Unlike a comment.
 */
export async function unlikeComment(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', user.id)
    .eq('comment_id', commentId)

  if (error) {
    return { success: false, error: 'Failed to unlike comment' }
  }

  supabase.rpc('increment_comment_like_count', { target_comment_id: commentId, delta: -1 }).then()

  return { success: true }
}

/**
 * Check if the current user has liked an article.
 */
export async function isArticleLiked(articleId: string): Promise<boolean> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { count } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('article_id', articleId)

  return (count || 0) > 0
}

/**
 * Batch check which articles the current user has liked.
 */
export async function batchCheckArticleLikes(articleIds: string[]): Promise<Set<string>> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data } = await supabase
    .from('likes')
    .select('article_id')
    .eq('user_id', user.id)
    .in('article_id', articleIds)

  return new Set((data || []).map((r: { article_id: string }) => r.article_id))
}
