import 'server-only'

import { createClient } from '@/lib/supabase/server'
import type { ArticleListDTO } from '@/lib/dal/articles'

/**
 * Search articles using full-text search via the search_articles RPC.
 */
export async function searchArticles(
  query: string,
  options: { limit?: number; offset?: number } = {}
): Promise<ArticleListDTO[]> {
  const { limit = 20, offset = 0 } = options
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('search_articles', {
    search_query: query,
    result_limit: limit,
    result_offset: offset,
  })

  if (error || !data) return []
  return data as ArticleListDTO[]
}

/**
 * Get trending articles based on recent engagement.
 * Uses view_count + like_count as a popularity signal from the last 7 days.
 */
export async function getTrendingArticles(
  limit = 10
): Promise<ArticleListDTO[]> {
  const supabase = await createClient()

  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const { data, error } = await supabase
    .from('articles')
    .select(`
      id, title, slug, excerpt, cover_image_url, category_id, status,
      is_featured, like_count, view_count, comment_count, bookmark_count,
      read_time_minutes, published_at, author_id,
      profiles!articles_author_id_fkey(display_name, avatar_url, username),
      categories(name)
    `)
    .eq('status', 'published')
    .gte('published_at', oneWeekAgo.toISOString())
    .order('view_count', { ascending: false })
    .limit(limit)

  if (error || !data) return []

  return data.map((row: Record<string, unknown>) => {
    const profile = row.profiles as { display_name: string; avatar_url: string | null; username: string } | null
    const category = row.categories as { name: string } | null
    return {
      id: row.id as string,
      title: row.title as string,
      slug: row.slug as string,
      excerpt: row.excerpt as string | null,
      cover_image_url: row.cover_image_url as string | null,
      category_id: row.category_id as string | null,
      category_name: category?.name || null,
      status: row.status as ArticleListDTO['status'],
      author_id: row.author_id as string,
      author_name: profile?.display_name || null,
      author_avatar: profile?.avatar_url || null,
      author_username: profile?.username || null,
      is_featured: (row.is_featured as boolean) || false,
      like_count: (row.like_count as number) || 0,
      view_count: (row.view_count as number) || 0,
      comment_count: (row.comment_count as number) || 0,
      bookmark_count: (row.bookmark_count as number) || 0,
      read_time_minutes: (row.read_time_minutes as number) || 1,
      published_at: row.published_at as string | null,
    }
  })
}
