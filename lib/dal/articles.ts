import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'

/**
 * Data Access Layer — Articles
 *
 * All article CRUD goes through here.
 * Each mutation verifies auth AND ownership (IDOR prevention).
 *
 * SECURITY:
 * - Mutations always re-verify auth (never trust page-level checks)
 * - Ownership checks prevent unauthorized modifications
 * - Only safe fields are returned (no internal metadata)
 * - Parameterized queries via Supabase SDK
 */

export type ArticleDTO = {
  id: string
  title: string
  content: string
  excerpt: string | null
  cover_image_url: string | null
  category: string | null
  status: 'draft' | 'published'
  author_id: string
  author_name: string | null
  author_avatar: string | null
  like_count: number
  view_count: number
  read_time_minutes: number
  created_at: string
  updated_at: string
  published_at: string | null
}

export type ArticleListDTO = {
  id: string
  title: string
  excerpt: string | null
  cover_image_url: string | null
  category: string | null
  status: 'draft' | 'published'
  author_name: string | null
  author_avatar: string | null
  like_count: number
  view_count: number
  read_time_minutes: number
  published_at: string | null
}

/**
 * Calculate estimated read time based on word count.
 */
function calculateReadTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

/**
 * Get published articles for the public feed.
 * No auth required. Returns minimal list DTOs.
 */
export async function getPublishedArticles(
  options: { limit?: number; offset?: number; category?: string } = {}
): Promise<ArticleListDTO[]> {
  const { limit = 20, offset = 0, category } = options
  const supabase = await createClient()

  let query = supabase
    .from('articles')
    .select(
      `
      id, title, excerpt, cover_image_url, category, status,
      like_count, view_count, read_time_minutes, published_at,
      profiles!articles_author_id_fkey(display_name, avatar_url)
      `
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error || !data) return []

  return data.map((row: Record<string, unknown>) => {
    const profile = row.profiles as { display_name: string; avatar_url: string | null } | null
    return {
      id: row.id as string,
      title: row.title as string,
      excerpt: row.excerpt as string | null,
      cover_image_url: row.cover_image_url as string | null,
      category: row.category as string | null,
      status: row.status as 'draft' | 'published',
      author_name: profile?.display_name || null,
      author_avatar: profile?.avatar_url || null,
      like_count: (row.like_count as number) || 0,
      view_count: (row.view_count as number) || 0,
      read_time_minutes: (row.read_time_minutes as number) || 1,
      published_at: row.published_at as string | null,
    }
  })
}

/**
 * Get a single published article by ID for public viewing.
 * Increments view count.
 */
export async function getArticleById(
  articleId: string
): Promise<ArticleDTO | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('articles')
    .select(
      `
      id, title, content, excerpt, cover_image_url, category, status,
      author_id, like_count, view_count, read_time_minutes,
      created_at, updated_at, published_at,
      profiles!articles_author_id_fkey(display_name, avatar_url)
      `
    )
    .eq('id', articleId)
    .eq('status', 'published')
    .single()

  if (error || !data) return null

  // Increment view count (fire-and-forget, don't block)
  supabase.rpc('increment_view_count', { article_id: articleId }).then()

  const row = data as Record<string, unknown>
  const profile = row.profiles as { display_name: string; avatar_url: string | null } | null

  return {
    id: row.id as string,
    title: row.title as string,
    content: row.content as string,
    excerpt: row.excerpt as string | null,
    cover_image_url: row.cover_image_url as string | null,
    category: row.category as string | null,
    status: row.status as 'draft' | 'published',
    author_id: row.author_id as string,
    author_name: profile?.display_name || null,
    author_avatar: profile?.avatar_url || null,
    like_count: (row.like_count as number) || 0,
    view_count: (row.view_count as number) || 0,
    read_time_minutes: (row.read_time_minutes as number) || 1,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    published_at: row.published_at as string | null,
  }
}

/**
 * Get the current user's articles (published + drafts).
 * Requires auth. Only returns own articles.
 */
export async function getMyArticles(
  options: { status?: 'draft' | 'published' } = {}
): Promise<ArticleListDTO[]> {
  const user = await requireAuth()
  const supabase = await createClient()

  let query = supabase
    .from('articles')
    .select(
      `
      id, title, excerpt, cover_image_url, category, status,
      like_count, view_count, read_time_minutes, published_at,
      profiles!articles_author_id_fkey(display_name, avatar_url)
      `
    )
    .eq('author_id', user.id)
    .order('updated_at', { ascending: false })

  if (options.status) {
    query = query.eq('status', options.status)
  }

  const { data, error } = await query

  if (error || !data) return []

  return data.map((row: Record<string, unknown>) => {
    const profile = row.profiles as { display_name: string; avatar_url: string | null } | null
    return {
      id: row.id as string,
      title: row.title as string,
      excerpt: row.excerpt as string | null,
      cover_image_url: row.cover_image_url as string | null,
      category: row.category as string | null,
      status: row.status as 'draft' | 'published',
      author_name: profile?.display_name || null,
      author_avatar: profile?.avatar_url || null,
      like_count: (row.like_count as number) || 0,
      view_count: (row.view_count as number) || 0,
      read_time_minutes: (row.read_time_minutes as number) || 1,
      published_at: row.published_at as string | null,
    }
  })
}

/**
 * Create a new article (draft by default).
 * Requires auth. Sets author_id to current user.
 */
export async function createArticle(input: {
  title: string
  content: string
  excerpt?: string
  cover_image_url?: string
  category?: string
  status?: 'draft' | 'published'
}): Promise<{ id: string } | { error: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const status = input.status || 'draft'
  const readTime = calculateReadTime(input.content)

  const { data, error } = await supabase
    .from('articles')
    .insert({
      title: input.title,
      content: input.content,
      excerpt: input.excerpt || null,
      cover_image_url: input.cover_image_url || null,
      category: input.category || null,
      status,
      author_id: user.id,
      read_time_minutes: readTime,
      published_at: status === 'published' ? new Date().toISOString() : null,
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error('Article creation failed:', error?.message)
    return { error: 'Failed to create article' }
  }

  return { id: data.id }
}

/**
 * Update an existing article.
 * Requires auth AND ownership (IDOR prevention).
 */
export async function updateArticle(
  articleId: string,
  updates: {
    title?: string
    content?: string
    excerpt?: string
    cover_image_url?: string
    category?: string
    status?: 'draft' | 'published'
  }
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  // Verify ownership BEFORE updating
  const { data: existing } = await supabase
    .from('articles')
    .select('author_id')
    .eq('id', articleId)
    .single()

  if (!existing || existing.author_id !== user.id) {
    return { success: false, error: 'Forbidden' }
  }

  // Build update payload
  const payload: Record<string, unknown> = { ...updates, updated_at: new Date().toISOString() }

  if (updates.content) {
    payload.read_time_minutes = calculateReadTime(updates.content)
  }

  if (updates.status === 'published' && !existing) {
    payload.published_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('articles')
    .update(payload)
    .eq('id', articleId)
    .eq('author_id', user.id) // Double-check ownership at DB level

  if (error) {
    console.error('Article update failed:', error.message)
    return { success: false, error: 'Failed to update article' }
  }

  return { success: true }
}

/**
 * Delete an article.
 * Requires auth AND ownership.
 */
export async function deleteArticle(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  // Verify ownership BEFORE deleting
  const { data: existing } = await supabase
    .from('articles')
    .select('author_id')
    .eq('id', articleId)
    .single()

  if (!existing || existing.author_id !== user.id) {
    return { success: false, error: 'Forbidden' }
  }

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', articleId)
    .eq('author_id', user.id) // Double-check at DB level

  if (error) {
    console.error('Article deletion failed:', error.message)
    return { success: false, error: 'Failed to delete article' }
  }

  return { success: true }
}
