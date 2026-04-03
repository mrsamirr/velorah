import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils/slug'

export type TagDTO = {
  id: string
  name: string
  slug: string
  article_count: number
}

/**
 * Search tags by name prefix. No auth required.
 */
export async function searchTags(query: string, limit = 20): Promise<TagDTO[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tags')
    .select('id, name, slug, article_count')
    .ilike('name', `${query}%`)
    .order('article_count', { ascending: false })
    .limit(limit)

  if (error || !data) return []
  return data as TagDTO[]
}

/**
 * Get a tag by slug.
 */
export async function getTagBySlug(slug: string): Promise<TagDTO | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tags')
    .select('id, name, slug, article_count')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data as TagDTO
}

/**
 * Get or create tags by name. Returns tag IDs.
 * Each new tag gets a generated slug.
 */
export async function getOrCreateTags(tagNames: string[]): Promise<string[]> {
  const supabase = await createClient()
  const tagIds: string[] = []

  for (const name of tagNames) {
    const trimmed = name.trim()
    if (!trimmed) continue

    const slug = generateSlug(trimmed)

    // Try to find existing
    const { data: existing } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existing) {
      tagIds.push(existing.id)
      continue
    }

    // Create new
    const { data: created } = await supabase
      .from('tags')
      .insert({ name: trimmed, slug })
      .select('id')
      .single()

    if (created) {
      tagIds.push(created.id)
    }
  }

  return tagIds
}

/**
 * Get all tags for a given article.
 */
export async function getArticleTags(articleId: string): Promise<TagDTO[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('article_tags')
    .select('tag_id, tags(id, name, slug, article_count)')
    .eq('article_id', articleId)

  if (error || !data) return []

  return data
    .map((row: Record<string, unknown>) => row.tags as TagDTO | null)
    .filter((t): t is TagDTO => t !== null)
}
