'use server'

import { revalidatePath } from 'next/cache'
import {
  createCategory as dalCreateCategory,
  updateCategory as dalUpdateCategory,
  deleteCategory as dalDeleteCategory,
} from '@/lib/dal/categories'
import {
  updateUserRole as dalUpdateUserRole,
  setArticleFeatured as dalSetArticleFeatured,
  setArticleStatus as dalSetArticleStatus,
  resolveReport as dalResolveReport,
} from '@/lib/dal/admin'
import { hideComment, deleteComment } from '@/lib/dal/comments'
import {
  CreateCategorySchema,
  UpdateCategorySchema,
  UpdateUserRoleSchema,
  ResolveReportSchema,
} from '@/lib/schemas/admin'
import type { ArticleStatus, ReportStatus } from '@/lib/types/database'

// ─── Categories ───────────────────────────────────

export async function createCategoryAction(
  formData: FormData
): Promise<{ id?: string; error?: string }> {
  const validatedFields = CreateCategorySchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description') || undefined,
    color: formData.get('color') || undefined,
    icon: formData.get('icon') || undefined,
    sort_order: Number(formData.get('sort_order') || 0),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid category data' }
  }

  const result = await dalCreateCategory(validatedFields.data)
  if ('error' in result) return { error: result.error }

  revalidatePath('/admin')
  return { id: result.id }
}

export async function updateCategoryAction(
  categoryId: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const raw: Record<string, unknown> = {}
  const fields = ['name', 'slug', 'description', 'color', 'icon'] as const
  for (const field of fields) {
    const val = formData.get(field)
    if (val !== null) raw[field] = val
  }
  const sortOrder = formData.get('sort_order')
  if (sortOrder !== null) raw.sort_order = Number(sortOrder)

  const validatedFields = UpdateCategorySchema.safeParse(raw)
  if (!validatedFields.success) {
    return { success: false, error: 'Invalid category data' }
  }

  const result = await dalUpdateCategory(categoryId, validatedFields.data)
  if (result.success) revalidatePath('/admin')
  return result
}

export async function deleteCategoryAction(
  categoryId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await dalDeleteCategory(categoryId)
  if (result.success) revalidatePath('/admin')
  return result
}

// ─── Users ────────────────────────────────────────

export async function updateUserRoleAction(
  userId: string,
  role: string
): Promise<{ success: boolean; error?: string }> {
  const validatedFields = UpdateUserRoleSchema.safeParse({ user_id: userId, role })
  if (!validatedFields.success) {
    return { success: false, error: 'Invalid role data' }
  }

  const result = await dalUpdateUserRole(
    validatedFields.data.user_id,
    validatedFields.data.role
  )
  if (result.success) revalidatePath('/admin')
  return result
}

// ─── Articles ─────────────────────────────────────

export async function setArticleFeaturedAction(
  articleId: string,
  featured: boolean
): Promise<{ success: boolean; error?: string }> {
  const result = await dalSetArticleFeatured(articleId, featured)
  if (result.success) {
    revalidatePath('/admin')
    revalidatePath('/feed')
  }
  return result
}

export async function setArticleStatusAction(
  articleId: string,
  status: ArticleStatus
): Promise<{ success: boolean; error?: string }> {
  const result = await dalSetArticleStatus(articleId, status)
  if (result.success) {
    revalidatePath('/admin')
    revalidatePath('/feed')
  }
  return result
}

// ─── Reports ──────────────────────────────────────

export async function resolveReportAction(
  reportId: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  const validatedFields = ResolveReportSchema.safeParse({ report_id: reportId, status })
  if (!validatedFields.success) {
    return { success: false, error: 'Invalid report resolution data' }
  }

  const result = await dalResolveReport(
    validatedFields.data.report_id,
    validatedFields.data.status as ReportStatus
  )
  if (result.success) revalidatePath('/admin')
  return result
}

// ─── Comments (Admin) ─────────────────────────────

export async function hideCommentAdminAction(
  commentId: string,
  hidden: boolean
): Promise<{ success: boolean; error?: string }> {
  const result = await hideComment(commentId, hidden)
  if (result.success) revalidatePath('/admin')
  return result
}

export async function deleteCommentAdminAction(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await deleteComment(commentId)
  if (result.success) revalidatePath('/admin')
  return result
}
