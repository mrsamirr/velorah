import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/dal/auth'

export type CategoryDTO = {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
  icon: string | null
  sort_order: number
  article_count: number
}

/**
 * Get all categories, ordered by sort_order.
 * No auth required.
 */
export async function getAllCategories(): Promise<CategoryDTO[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, description, color, icon, sort_order, article_count')
    .order('sort_order', { ascending: true })

  if (error || !data) return []
  return data as CategoryDTO[]
}

/**
 * Get a single category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<CategoryDTO | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, description, color, icon, sort_order, article_count')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data as CategoryDTO
}

/**
 * Create a category. Admin only.
 */
export async function createCategory(input: {
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
  sort_order?: number
}): Promise<{ id: string } | { error: string }> {
  await requireRole('admin')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: input.name,
      slug: input.slug,
      description: input.description || null,
      color: input.color || null,
      icon: input.icon || null,
      sort_order: input.sort_order ?? 0,
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error('Category creation failed:', error?.message)
    return { error: 'Failed to create category' }
  }

  return { id: data.id }
}

/**
 * Update a category. Admin only.
 */
export async function updateCategory(
  categoryId: string,
  updates: {
    name?: string
    slug?: string
    description?: string
    color?: string
    icon?: string
    sort_order?: number
  }
): Promise<{ success: boolean; error?: string }> {
  await requireRole('admin')
  const supabase = await createClient()

  const { error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', categoryId)

  if (error) {
    console.error('Category update failed:', error.message)
    return { success: false, error: 'Failed to update category' }
  }

  return { success: true }
}

/**
 * Delete a category. Admin only.
 */
export async function deleteCategory(
  categoryId: string
): Promise<{ success: boolean; error?: string }> {
  await requireRole('admin')
  const supabase = await createClient()

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId)

  if (error) {
    console.error('Category deletion failed:', error.message)
    return { success: false, error: 'Failed to delete category' }
  }

  return { success: true }
}
