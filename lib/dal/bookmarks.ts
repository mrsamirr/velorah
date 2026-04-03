import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'
import type { ArticleListDTO } from '@/lib/dal/articles'

/**
 * Bookmark an article.
 */
export async function bookmarkArticle(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('bookmarks')
    .insert({ user_id: user.id, article_id: articleId })

  if (error) {
    if (error.code === '23505') return { success: false, error: 'Already bookmarked' }
    console.error('Bookmark failed:', error.message)
    return { success: false, error: 'Failed to bookmark' }
  }

  supabase.rpc('increment_bookmark_count', { target_article_id: articleId, delta: 1 }).then()

  return { success: true }
}

/**
 * Remove a bookmark.
 */
export async function unbookmarkArticle(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', user.id)
    .eq('article_id', articleId)

  if (error) {
    console.error('Unbookmark failed:', error.message)
    return { success: false, error: 'Failed to remove bookmark' }
  }

  supabase.rpc('increment_bookmark_count', { target_article_id: articleId, delta: -1 }).then()

  return { success: true }
}

/**
 * Check if the current user has bookmarked an article.
 */
export async function isBookmarked(articleId: string): Promise<boolean> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { count } = await supabase
    .from('bookmarks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('article_id', articleId)

  return (count || 0) > 0
}

/**
 * Batch check which articles the current user has bookmarked.
 */
export async function batchCheckBookmarks(articleIds: string[]): Promise<Set<string>> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data } = await supabase
    .from('bookmarks')
    .select('article_id')
    .eq('user_id', user.id)
    .in('article_id', articleIds)

  return new Set((data || []).map((r: { article_id: string }) => r.article_id))
}

/**
 * Get the current user's bookmarked articles.
 */
export async function getMyBookmarks(
  options: { limit?: number; offset?: number } = {}
): Promise<ArticleListDTO[]> {
  const { limit = 20, offset = 0 } = options
  const user = await requireAuth()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('bookmarks')
    .select(`
      article_id,
      articles(
        id, title, slug, excerpt, cover_image_url, category_id, status,
        is_featured, like_count, view_count, comment_count, bookmark_count,
        read_time_minutes, published_at, author_id,
        profiles!articles_author_id_fkey(display_name, avatar_url, username),
        categories(name)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error || !data) return []

  return data
    .map((row: Record<string, unknown>) => {
      const article = row.articles as Record<string, unknown> | null
      if (!article) return null
      const profile = article.profiles as { display_name: string; avatar_url: string | null; username: string } | null
      const category = article.categories as { name: string } | null
      return {
        id: article.id as string,
        title: article.title as string,
        slug: article.slug as string,
        excerpt: article.excerpt as string | null,
        cover_image_url: article.cover_image_url as string | null,
        category_id: article.category_id as string | null,
        category_name: category?.name || null,
        status: article.status as ArticleListDTO['status'],
        author_id: article.author_id as string,
        author_name: profile?.display_name || null,
        author_avatar: profile?.avatar_url || null,
        author_username: profile?.username || null,
        is_featured: (article.is_featured as boolean) || false,
        like_count: (article.like_count as number) || 0,
        view_count: (article.view_count as number) || 0,
        comment_count: (article.comment_count as number) || 0,
        bookmark_count: (article.bookmark_count as number) || 0,
        read_time_minutes: (article.read_time_minutes as number) || 1,
        published_at: article.published_at as string | null,
      }
    })
    .filter((a): a is ArticleListDTO => a !== null)
}
