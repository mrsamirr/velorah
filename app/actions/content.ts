'use server'

import { revalidatePath } from 'next/cache'
import {
  createArticle as dalCreateArticle,
  updateArticle as dalUpdateArticle,
  deleteArticle as dalDeleteArticle,
} from '@/lib/dal/articles'
import { updateProfile as dalUpdateProfile } from '@/lib/dal/profiles'
import { getOrCreateTags } from '@/lib/dal/tags'
import { stripHtml } from '@/lib/utils/sanitize'
import {
  CreateArticleSchema,
  UpdateArticleSchema,
  UpdateProfileSchema,
  type ArticleFormState,
  type ProfileFormState,
} from '@/lib/schemas/content'

/**
 * Content Server Actions
 *
 * SECURITY:
 * - All input validated with Zod BEFORE any DB calls
 * - Auth + ownership checked inside the DAL (defense in depth)
 * - Return values contain only what the client needs
 * - Server Actions are reachable via POST — always re-validate
 */

export async function createArticleAction(
  state: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState & { id?: string; slug?: string }> {
  // Parse tag_ids from JSON string
  let tag_ids: string[] | undefined
  const tagIdsRaw = formData.get('tag_ids')
  if (tagIdsRaw && typeof tagIdsRaw === 'string') {
    try { tag_ids = JSON.parse(tagIdsRaw) } catch { /* ignore */ }
  }

  // Parse comma-separated tags
  const tagsRaw = formData.get('tags')
  if (!tag_ids && tagsRaw && typeof tagsRaw === 'string') {
    const tagNames = tagsRaw.split(',').map(t => t.trim()).filter(Boolean)
    if (tagNames.length > 0) {
      tag_ids = await getOrCreateTags(tagNames)
    }
  }

  const validatedFields = CreateArticleSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    content_raw: formData.get('content_raw') || undefined,
    excerpt: formData.get('excerpt') || undefined,
    cover_image_url: formData.get('cover_image_url') || undefined,
    cover_image_alt: formData.get('cover_image_alt') || undefined,
    category_id: formData.get('category_id') || undefined,
    tag_ids,
    status: formData.get('status') || 'draft',
    allow_comments: formData.get('allow_comments') !== 'false',
    scheduled_at: formData.get('scheduled_at') || undefined,
    meta_title: formData.get('meta_title') || undefined,
    meta_description: formData.get('meta_description') || undefined,
    canonical_url: formData.get('canonical_url') || undefined,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const articleData = { ...validatedFields.data }
  if (!articleData.content_raw && articleData.content) {
    articleData.content_raw = stripHtml(articleData.content)
  }

  const result = await dalCreateArticle(articleData)

  if ('error' in result) {
    return { message: result.error }
  }

  revalidatePath('/author')
  revalidatePath('/feed')
  revalidatePath('/')

  return { id: result.id, slug: result.slug }
}

export async function updateArticleAction(
  articleId: string,
  state: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const raw: Record<string, unknown> = {}
  const fields = ['title', 'content', 'content_raw', 'excerpt', 'cover_image_url',
    'cover_image_alt', 'category_id', 'status', 'meta_title', 'meta_description',
    'canonical_url', 'scheduled_at'] as const

  for (const field of fields) {
    const val = formData.get(field)
    if (val !== null) raw[field] = val
  }

  const allowComments = formData.get('allow_comments')
  if (allowComments !== null) raw.allow_comments = allowComments !== 'false'

  const isPinned = formData.get('is_pinned')
  if (isPinned !== null) raw.is_pinned = isPinned === 'true'

  const tagIdsRaw = formData.get('tag_ids')
  if (tagIdsRaw && typeof tagIdsRaw === 'string') {
    try { raw.tag_ids = JSON.parse(tagIdsRaw) } catch { /* ignore */ }
  }

  const validatedFields = UpdateArticleSchema.safeParse(raw)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const result = await dalUpdateArticle(articleId, validatedFields.data)

  if (!result.success) {
    return { message: result.error || 'Failed to update article' }
  }

  revalidatePath('/author')
  revalidatePath('/feed')
  revalidatePath(`/article/${articleId}`)

  return { message: 'Article updated successfully' }
}

export async function deleteArticleAction(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  // Delegate to DAL (handles auth + ownership + DB delete)
  const result = await dalDeleteArticle(articleId)

  if (!result.success) {
    return { success: false, error: result.error || 'Failed to delete article' }
  }

  // Revalidate affected paths
  revalidatePath('/author')
  revalidatePath('/feed')

  return { success: true }
}

export async function publishArticleAction(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await dalUpdateArticle(articleId, {
    status: 'published',
  })

  if (!result.success) {
    return { success: false, error: result.error }
  }

  revalidatePath('/author')
  revalidatePath('/feed')

  return { success: true }
}

export async function archiveArticleAction(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await dalUpdateArticle(articleId, {
    status: 'archived',
  })

  if (!result.success) {
    return { success: false, error: result.error }
  }

  revalidatePath('/author')
  revalidatePath('/feed')

  return { success: true }
}

export async function pinArticleAction(
  articleId: string,
  pinned: boolean
): Promise<{ success: boolean; error?: string }> {
  const result = await dalUpdateArticle(articleId, {
    is_pinned: pinned,
  })

  if (!result.success) {
    return { success: false, error: result.error }
  }

  revalidatePath('/author')

  return { success: true }
}

export async function scheduleArticleAction(
  articleId: string,
  scheduledAt: string
): Promise<{ success: boolean; error?: string }> {
  // Validate scheduled_at is a valid future date
  const parsed = new Date(scheduledAt)
  if (isNaN(parsed.getTime()) || parsed <= new Date()) {
    return { success: false, error: 'Scheduled date must be in the future' }
  }

  const result = await dalUpdateArticle(articleId, {
    scheduled_at: scheduledAt,
  })

  if (!result.success) {
    return { success: false, error: result.error }
  }

  revalidatePath('/author')

  return { success: true }
}

export async function updateProfileAction(
  state: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const raw: Record<string, unknown> = {}
  const fields = ['display_name', 'username', 'bio', 'avatar_url', 'cover_image_url',
    'website_url', 'location'] as const

  for (const field of fields) {
    const val = formData.get(field)
    if (val !== null) raw[field] = val || undefined
  }

  // Parse social_links from JSON string
  const socialLinksRaw = formData.get('social_links')
  if (socialLinksRaw && typeof socialLinksRaw === 'string') {
    try { raw.social_links = JSON.parse(socialLinksRaw) } catch { /* ignore */ }
  }

  const emailNotifications = formData.get('email_notifications')
  if (emailNotifications !== null) raw.email_notifications = emailNotifications === 'true'

  const validatedFields = UpdateProfileSchema.safeParse(raw)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const result = await dalUpdateProfile(validatedFields.data)

  if (!result.success) {
    return { message: result.error || 'Failed to update profile' }
  }

  revalidatePath('/author')
  revalidatePath('/settings')
  return { message: 'Profile updated successfully' }
}
