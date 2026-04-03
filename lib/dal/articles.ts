import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'
import { generateSlug, ensureUniqueSlug } from '@/lib/utils/slug'
import { sanitizeArticleHtml } from '@/lib/utils/sanitize'
import { calculateReadingTime } from '@/lib/utils/reading-time'
import type { ArticleStatus } from '@/lib/types/database'

/**
 * Data Access Layer — Articles
 *
 * All article CRUD goes through here.
 * Each mutation verifies auth AND ownership (IDOR prevention).
 */

export type ArticleDTO = {
  id: string
  title: string
  slug: string
  content: string
  content_raw: string | null
  excerpt: string | null
  cover_image_url: string | null
  cover_image_alt: string | null
  category_id: string | null
  category_name: string | null
  status: ArticleStatus
  author_id: string
  author_name: string | null
  author_avatar: string | null
  author_username: string | null
  is_featured: boolean
  is_pinned: boolean
  allow_comments: boolean
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  like_count: number
  view_count: number
  comment_count: number
  bookmark_count: number
  word_count: number
  read_time_minutes: number
  language: string
  scheduled_at: string | null
  created_at: string
  updated_at: string
  published_at: string | null
  tag_ids?: string[]
}

export type ArticleListDTO = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image_url: string | null
  category_id: string | null
  category_name: string | null
  status: ArticleStatus
  author_id: string
  author_name: string | null
  author_avatar: string | null
  author_username: string | null
  is_featured: boolean
  like_count: number
  view_count: number
  comment_count: number
  bookmark_count: number
  read_time_minutes: number
  published_at: string | null
}

const LIST_SELECT = `
  id, title, slug, excerpt, cover_image_url, category_id, status,
  is_featured, like_count, view_count, comment_count, bookmark_count,
  read_time_minutes, published_at, author_id,
  profiles!articles_author_id_fkey(display_name, avatar_url, username),
  categories(name)
`

function mapListRow(row: Record<string, unknown>): ArticleListDTO {
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
    status: row.status as ArticleStatus,
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
}

/**
 * Get published articles for the public feed.
 */
export async function getPublishedArticles(
  options: {
    limit?: number
    offset?: number
    category_id?: string
    tag_id?: string
    author_id?: string
    sort?: 'recent' | 'popular' | 'most_liked'
    featured?: boolean
  } = {}
): Promise<ArticleListDTO[]> {
  const { limit = 20, offset = 0, category_id, author_id, sort = 'recent', featured } = options
  const supabase = await createClient()

  let query = supabase
    .from('articles')
    .select(LIST_SELECT)
    .eq('status', 'published')
    .range(offset, offset + limit - 1)

  if (category_id) query = query.eq('category_id', category_id)
  if (author_id) query = query.eq('author_id', author_id)
  if (featured !== undefined) query = query.eq('is_featured', featured)

  switch (sort) {
    case 'popular':
      query = query.order('view_count', { ascending: false })
      break
    case 'most_liked':
      query = query.order('like_count', { ascending: false })
      break
    default:
      query = query.order('published_at', { ascending: false })
  }

  const { data, error } = await query

  if (error || !data) return []

  let articles = data.map((row: Record<string, unknown>) => mapListRow(row))

  // If tag filter, perform a subquery join
  if (options.tag_id) {
    const { data: tagArticleIds } = await supabase
      .from('article_tags')
      .select('article_id')
      .eq('tag_id', options.tag_id)

    if (tagArticleIds) {
      const ids = new Set(tagArticleIds.map((r: { article_id: string }) => r.article_id))
      articles = articles.filter((a) => ids.has(a.id))
    }
  }

  return articles
}

/**
 * Get a single published article by slug for public viewing.
 * Increments view count.
 */
export async function getArticleBySlug(slug: string): Promise<ArticleDTO | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('articles')
    .select(`
      id, title, slug, content, content_raw, excerpt, cover_image_url, cover_image_alt,
      category_id, status, author_id, is_featured, is_pinned, allow_comments,
      meta_title, meta_description, canonical_url,
      like_count, view_count, comment_count, bookmark_count, word_count,
      read_time_minutes, language, scheduled_at, created_at, updated_at, published_at,
      profiles!articles_author_id_fkey(display_name, avatar_url, username),
      categories(name)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) return null

  // Fire-and-forget view count increment
  supabase.rpc('increment_view_count', { article_id: data.id }).then()

  const row = data as Record<string, unknown>
  const profile = row.profiles as { display_name: string; avatar_url: string | null; username: string } | null
  const category = row.categories as { name: string } | null

  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    content: row.content as string,
    content_raw: row.content_raw as string | null,
    excerpt: row.excerpt as string | null,
    cover_image_url: row.cover_image_url as string | null,
    cover_image_alt: row.cover_image_alt as string | null,
    category_id: row.category_id as string | null,
    category_name: category?.name || null,
    status: row.status as ArticleStatus,
    author_id: row.author_id as string,
    author_name: profile?.display_name || null,
    author_avatar: profile?.avatar_url || null,
    author_username: profile?.username || null,
    is_featured: (row.is_featured as boolean) || false,
    is_pinned: (row.is_pinned as boolean) || false,
    allow_comments: row.allow_comments as boolean,
    meta_title: row.meta_title as string | null,
    meta_description: row.meta_description as string | null,
    canonical_url: row.canonical_url as string | null,
    like_count: (row.like_count as number) || 0,
    view_count: (row.view_count as number) || 0,
    comment_count: (row.comment_count as number) || 0,
    bookmark_count: (row.bookmark_count as number) || 0,
    word_count: (row.word_count as number) || 0,
    read_time_minutes: (row.read_time_minutes as number) || 1,
    language: row.language as string,
    scheduled_at: row.scheduled_at as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    published_at: row.published_at as string | null,
  }
}

/**
 * Get article by slug for editing. Includes content_raw and tag_ids.
 * Requires auth and ownership.
 */
export async function getArticleBySlugForEdit(slug: string): Promise<ArticleDTO | null> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('articles')
    .select(`
      id, title, slug, content, content_raw, excerpt, cover_image_url, cover_image_alt,
      category_id, status, author_id, is_featured, is_pinned, allow_comments,
      meta_title, meta_description, canonical_url,
      like_count, view_count, comment_count, bookmark_count, word_count,
      read_time_minutes, language, scheduled_at, created_at, updated_at, published_at,
      profiles!articles_author_id_fkey(display_name, avatar_url, username),
      categories(name)
    `)
    .eq('slug', slug)
    .eq('author_id', user.id)
    .single()

  if (error || !data) return null

  // Also fetch tag IDs
  const { data: tagData } = await supabase
    .from('article_tags')
    .select('tag_id')
    .eq('article_id', data.id)

  const row = data as Record<string, unknown>
  const profile = row.profiles as { display_name: string; avatar_url: string | null; username: string } | null
  const category = row.categories as { name: string } | null

  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    content: row.content as string,
    content_raw: row.content_raw as string | null,
    excerpt: row.excerpt as string | null,
    cover_image_url: row.cover_image_url as string | null,
    cover_image_alt: row.cover_image_alt as string | null,
    category_id: row.category_id as string | null,
    category_name: category?.name || null,
    status: row.status as ArticleStatus,
    author_id: row.author_id as string,
    author_name: profile?.display_name || null,
    author_avatar: profile?.avatar_url || null,
    author_username: profile?.username || null,
    is_featured: (row.is_featured as boolean) || false,
    is_pinned: (row.is_pinned as boolean) || false,
    allow_comments: row.allow_comments as boolean,
    meta_title: row.meta_title as string | null,
    meta_description: row.meta_description as string | null,
    canonical_url: row.canonical_url as string | null,
    like_count: (row.like_count as number) || 0,
    view_count: (row.view_count as number) || 0,
    comment_count: (row.comment_count as number) || 0,
    bookmark_count: (row.bookmark_count as number) || 0,
    word_count: (row.word_count as number) || 0,
    read_time_minutes: (row.read_time_minutes as number) || 1,
    language: row.language as string,
    scheduled_at: row.scheduled_at as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    published_at: row.published_at as string | null,
    tag_ids: tagData?.map((t: { tag_id: string }) => t.tag_id) || [],
  }
}

/**
 * Get a single article by ID (for backward compatibility).
 */
export async function getArticleById(articleId: string): Promise<ArticleDTO | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('articles')
    .select(`
      id, title, slug, content, content_raw, excerpt, cover_image_url, cover_image_alt,
      category_id, status, author_id, is_featured, is_pinned, allow_comments,
      meta_title, meta_description, canonical_url,
      like_count, view_count, comment_count, bookmark_count, word_count,
      read_time_minutes, language, scheduled_at, created_at, updated_at, published_at,
      profiles!articles_author_id_fkey(display_name, avatar_url, username),
      categories(name)
    `)
    .eq('id', articleId)
    .eq('status', 'published')
    .single()

  if (error || !data) return null

  supabase.rpc('increment_view_count', { article_id: articleId }).then()

  const row = data as Record<string, unknown>
  const profile = row.profiles as { display_name: string; avatar_url: string | null; username: string } | null
  const category = row.categories as { name: string } | null

  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    content: row.content as string,
    content_raw: row.content_raw as string | null,
    excerpt: row.excerpt as string | null,
    cover_image_url: row.cover_image_url as string | null,
    cover_image_alt: row.cover_image_alt as string | null,
    category_id: row.category_id as string | null,
    category_name: category?.name || null,
    status: row.status as ArticleStatus,
    author_id: row.author_id as string,
    author_name: profile?.display_name || null,
    author_avatar: profile?.avatar_url || null,
    author_username: profile?.username || null,
    is_featured: (row.is_featured as boolean) || false,
    is_pinned: (row.is_pinned as boolean) || false,
    allow_comments: row.allow_comments as boolean,
    meta_title: row.meta_title as string | null,
    meta_description: row.meta_description as string | null,
    canonical_url: row.canonical_url as string | null,
    like_count: (row.like_count as number) || 0,
    view_count: (row.view_count as number) || 0,
    comment_count: (row.comment_count as number) || 0,
    bookmark_count: (row.bookmark_count as number) || 0,
    word_count: (row.word_count as number) || 0,
    read_time_minutes: (row.read_time_minutes as number) || 1,
    language: row.language as string,
    scheduled_at: row.scheduled_at as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    published_at: row.published_at as string | null,
  }
}

/**
 * Get the current user's articles.
 */
export async function getMyArticles(
  options: { status?: ArticleStatus } = {}
): Promise<ArticleListDTO[]> {
  const user = await requireAuth()
  const supabase = await createClient()

  let query = supabase
    .from('articles')
    .select(LIST_SELECT)
    .eq('author_id', user.id)
    .order('updated_at', { ascending: false })

  if (options.status) {
    query = query.eq('status', options.status)
  }

  const { data, error } = await query

  if (error || !data) return []
  return data.map((row: Record<string, unknown>) => mapListRow(row))
}

/**
 * Create a new article with slug generation, tag handling, and sanitization.
 */
export async function createArticle(input: {
  title: string
  content: string
  content_raw?: string
  excerpt?: string
  cover_image_url?: string
  cover_image_alt?: string
  category_id?: string
  tag_ids?: string[]
  status?: ArticleStatus
  allow_comments?: boolean
  scheduled_at?: string
  meta_title?: string
  meta_description?: string
  canonical_url?: string
}): Promise<{ id: string; slug: string } | { error: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const status = input.status || 'draft'
  const sanitizedContent = sanitizeArticleHtml(input.content)
  const { readTimeMinutes, wordCount } = calculateReadingTime(sanitizedContent)

  // Generate unique slug
  const baseSlug = generateSlug(input.title)
  const slug = await ensureUniqueSlug(supabase, baseSlug)

  const { data, error } = await supabase
    .from('articles')
    .insert({
      title: input.title,
      slug,
      content: sanitizedContent,
      content_raw: input.content_raw || null,
      excerpt: input.excerpt || null,
      cover_image_url: input.cover_image_url || null,
      cover_image_alt: input.cover_image_alt || null,
      category_id: input.category_id || null,
      status,
      author_id: user.id,
      allow_comments: input.allow_comments ?? true,
      read_time_minutes: readTimeMinutes,
      word_count: wordCount,
      scheduled_at: input.scheduled_at || null,
      meta_title: input.meta_title || null,
      meta_description: input.meta_description || null,
      canonical_url: input.canonical_url || null,
      published_at: status === 'published' ? new Date().toISOString() : null,
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error('Article creation failed:', error?.message)
    return { error: 'Failed to create article' }
  }

  // Attach tags
  if (input.tag_ids && input.tag_ids.length > 0) {
    const tagInserts = input.tag_ids.map((tag_id) => ({
      article_id: data.id,
      tag_id,
    }))
    await supabase.from('article_tags').insert(tagInserts)
  }

  // Update author's article count
  supabase.rpc('update_article_count', { p_author_id: user.id, delta: 1 }).then()

  return { id: data.id, slug }
}

/**
 * Update an existing article.
 * Requires auth AND ownership. Handles tag sync and status transitions.
 */
export async function updateArticle(
  articleId: string,
  updates: {
    title?: string
    content?: string
    content_raw?: string
    excerpt?: string
    cover_image_url?: string
    cover_image_alt?: string
    category_id?: string
    tag_ids?: string[]
    status?: ArticleStatus
    is_pinned?: boolean
    allow_comments?: boolean
    scheduled_at?: string
    meta_title?: string
    meta_description?: string
    canonical_url?: string
  }
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  // Verify ownership
  const { data: existing } = await supabase
    .from('articles')
    .select('author_id, status, published_at')
    .eq('id', articleId)
    .single()

  if (!existing || existing.author_id !== user.id) {
    return { success: false, error: 'Forbidden' }
  }

  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  // Copy simple fields
  if (updates.title !== undefined) payload.title = updates.title
  if (updates.excerpt !== undefined) payload.excerpt = updates.excerpt || null
  if (updates.cover_image_url !== undefined) payload.cover_image_url = updates.cover_image_url || null
  if (updates.cover_image_alt !== undefined) payload.cover_image_alt = updates.cover_image_alt || null
  if (updates.category_id !== undefined) payload.category_id = updates.category_id || null
  if (updates.is_pinned !== undefined) payload.is_pinned = updates.is_pinned
  if (updates.allow_comments !== undefined) payload.allow_comments = updates.allow_comments
  if (updates.scheduled_at !== undefined) payload.scheduled_at = updates.scheduled_at || null
  if (updates.meta_title !== undefined) payload.meta_title = updates.meta_title || null
  if (updates.meta_description !== undefined) payload.meta_description = updates.meta_description || null
  if (updates.canonical_url !== undefined) payload.canonical_url = updates.canonical_url || null
  if (updates.content_raw !== undefined) payload.content_raw = updates.content_raw || null

  if (updates.content) {
    payload.content = sanitizeArticleHtml(updates.content)
    const { readTimeMinutes, wordCount } = calculateReadingTime(updates.content)
    payload.read_time_minutes = readTimeMinutes
    payload.word_count = wordCount
  }

  // Status transition: set published_at when first published
  if (updates.status) {
    payload.status = updates.status
    if (updates.status === 'published' && !existing.published_at) {
      payload.published_at = new Date().toISOString()
    }
  }

  const { error } = await supabase
    .from('articles')
    .update(payload)
    .eq('id', articleId)
    .eq('author_id', user.id)

  if (error) {
    console.error('Article update failed:', error.message)
    return { success: false, error: 'Failed to update article' }
  }

  // Sync tags if provided
  if (updates.tag_ids !== undefined) {
    // Remove existing
    await supabase.from('article_tags').delete().eq('article_id', articleId)
    // Insert new
    if (updates.tag_ids.length > 0) {
      const tagInserts = updates.tag_ids.map((tag_id) => ({
        article_id: articleId,
        tag_id,
      }))
      await supabase.from('article_tags').insert(tagInserts)
    }
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
    .eq('author_id', user.id)

  if (error) {
    console.error('Article deletion failed:', error.message)
    return { success: false, error: 'Failed to delete article' }
  }

  // Decrement author's article count
  supabase.rpc('update_article_count', { p_author_id: user.id, delta: -1 }).then()

  return { success: true }
}

/**
 * Get featured articles for homepage/feed.
 */
export async function getFeaturedArticles(limit = 5): Promise<ArticleListDTO[]> {
  return getPublishedArticles({ limit, featured: true, sort: 'recent' })
}