import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireRole } from '@/lib/dal/auth'
import type { ArticleStatus, UserRole, ReportStatus } from '@/lib/types/database'

export type PlatformStats = {
  total_users: number
  total_articles: number
  published_articles: number
  total_comments: number
  total_reports_pending: number
}

/**
 * Get platform-wide stats. Admin only.
 */
export async function getPlatformStats(): Promise<PlatformStats> {
  await requireRole('admin')
  const supabase = await createClient()

  const [users, articles, published, comments, reports] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ])

  return {
    total_users: users.count || 0,
    total_articles: articles.count || 0,
    published_articles: published.count || 0,
    total_comments: comments.count || 0,
    total_reports_pending: reports.count || 0,
  }
}

export type AdminUserDTO = {
  id: string
  email: string
  display_name: string
  username: string
  role: string
  is_verified: boolean
  article_count: number
  created_at: string
}

/**
 * Get all users. Admin only.
 */
export async function getAllUsers(
  options: { limit?: number; offset?: number; role?: UserRole } = {}
): Promise<AdminUserDTO[]> {
  const { limit = 50, offset = 0, role } = options
  await requireRole('admin')
  const supabase = await createClient()

  let query = supabase
    .from('profiles')
    .select('id, email, display_name, username, role, is_verified, article_count, created_at')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (role) query = query.eq('role', role)

  const { data, error } = await query
  if (error || !data) return []
  return data as AdminUserDTO[]
}

/**
 * Update a user's role. Admin only. Uses admin client to bypass RLS.
 */
export async function updateUserRole(
  userId: string,
  role: UserRole
): Promise<{ success: boolean; error?: string }> {
  await requireRole('admin')
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)

  if (error) {
    console.error('Role update failed:', error.message)
    return { success: false, error: 'Failed to update user role' }
  }

  return { success: true }
}

export type AdminArticleDTO = {
  id: string
  title: string
  slug: string
  status: ArticleStatus
  author_id: string
  author_name: string | null
  author_username: string | null
  is_featured: boolean
  like_count: number
  view_count: number
  created_at: string
  published_at: string | null
}

/**
 * Get all articles for admin panel. Admin only.
 */
export async function getAllArticlesAdmin(
  options: { limit?: number; offset?: number; status?: ArticleStatus } = {}
): Promise<AdminArticleDTO[]> {
  const { limit = 50, offset = 0, status } = options
  await requireRole('admin')
  const supabase = await createClient()

  let query = supabase
    .from('articles')
    .select(`
      id, title, slug, status, author_id, is_featured,
      like_count, view_count, created_at, published_at,
      profiles!articles_author_id_fkey(display_name, username)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error || !data) return []

  return data.map((row: Record<string, unknown>) => {
    const profile = row.profiles as { display_name: string; username: string } | null
    return {
      id: row.id as string,
      title: row.title as string,
      slug: row.slug as string,
      status: row.status as ArticleStatus,
      author_id: row.author_id as string,
      author_name: profile?.display_name || null,
      author_username: profile?.username || null,
      is_featured: (row.is_featured as boolean) || false,
      like_count: (row.like_count as number) || 0,
      view_count: (row.view_count as number) || 0,
      created_at: row.created_at as string,
      published_at: row.published_at as string | null,
    }
  })
}

/**
 * Set an article as featured/unfeatured. Admin only.
 */
export async function setArticleFeatured(
  articleId: string,
  featured: boolean
): Promise<{ success: boolean; error?: string }> {
  await requireRole('admin')
  const supabase = await createClient()

  const { error } = await supabase
    .from('articles')
    .update({ is_featured: featured })
    .eq('id', articleId)

  if (error) {
    console.error('Set featured failed:', error.message)
    return { success: false, error: 'Failed to update article' }
  }

  return { success: true }
}

/**
 * Set an article's status. Admin only.
 */
export async function setArticleStatus(
  articleId: string,
  status: ArticleStatus
): Promise<{ success: boolean; error?: string }> {
  await requireRole('admin')
  const supabase = await createClient()

  const payload: Record<string, unknown> = { status }
  if (status === 'published') {
    const { data: existing } = await supabase
      .from('articles')
      .select('published_at')
      .eq('id', articleId)
      .single()
    if (existing && !existing.published_at) {
      payload.published_at = new Date().toISOString()
    }
  }

  const { error } = await supabase
    .from('articles')
    .update(payload)
    .eq('id', articleId)

  if (error) {
    console.error('Set status failed:', error.message)
    return { success: false, error: 'Failed to update article status' }
  }

  return { success: true }
}

export type AdminReportDTO = {
  id: string
  reporter_id: string
  reporter_username: string | null
  entity_type: string
  entity_id: string
  reason: string
  description: string | null
  status: string
  resolved_by: string | null
  created_at: string
  updated_at: string
}

/**
 * Get all reports. Admin only.
 */
export async function getAllReports(
  options: { limit?: number; offset?: number; status?: ReportStatus } = {}
): Promise<AdminReportDTO[]> {
  const { limit = 50, offset = 0, status } = options
  await requireRole('admin')
  const supabase = await createClient()

  let query = supabase
    .from('reports')
    .select(`
      id, reporter_id, entity_type, entity_id, reason,
      description, status, resolved_by, created_at, updated_at,
      profiles!reports_reporter_id_fkey(username)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error || !data) return []

  return data.map((row: Record<string, unknown>) => {
    const reporter = row.profiles as { username: string } | null
    return {
      id: row.id as string,
      reporter_id: row.reporter_id as string,
      reporter_username: reporter?.username || null,
      entity_type: row.entity_type as string,
      entity_id: row.entity_id as string,
      reason: row.reason as string,
      description: row.description as string | null,
      status: row.status as string,
      resolved_by: row.resolved_by as string | null,
      created_at: row.created_at as string,
      updated_at: row.updated_at as string,
    }
  })
}

/**
 * Resolve a report. Admin only.
 */
export async function resolveReport(
  reportId: string,
  status: ReportStatus
): Promise<{ success: boolean; error?: string }> {
  const user = await requireRole('admin')
  const supabase = await createClient()

  const { error } = await supabase
    .from('reports')
    .update({
      status,
      resolved_by: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reportId)

  if (error) {
    console.error('Resolve report failed:', error.message)
    return { success: false, error: 'Failed to resolve report' }
  }

  return { success: true }
}
